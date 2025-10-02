document.addEventListener('DOMContentLoaded', function() {
  // This object will be replaced by the export logic with actual user data
  const USER_COMMANDS = __USER_COMMANDS__;
  window.USER_COMMANDS = USER_COMMANDS;

  if (window.USER_COMMANDS && window.USER_COMMANDS.name) {
    document.getElementById('terminal-title').textContent = window.USER_COMMANDS.name;
  }

  function getAvailableCommands() {
    return Object.keys(USER_COMMANDS);
  }

  function getCommandOutput(cmd) {
    switch (cmd) {
      case 'name':
        return USER_COMMANDS.name || 'No name info.';
      case 'about':
        return USER_COMMANDS.about || 'No about info.';
      case 'skills':
        if (Array.isArray(USER_COMMANDS.skills) && USER_COMMANDS.skills.length) {
          if (typeof USER_COMMANDS.skills[0] === 'string') {
            return USER_COMMANDS.skills
              .map(s => s.split('|').map(part => part.trim()).join('\n'))
              .join('\n');
          }
          return USER_COMMANDS.skills.map(g => {
            let out = '';
            if (g.languages) out += `Languages: ${g.languages}\n`;
            if (g.frameworks) out += `Frameworks: ${g.frameworks}\n`;
            if (g.tools) out += `Tools: ${g.tools}\n`;
            return out.trim();
          }).join('\n\n');
        }
        return 'No skills info.';

      case 'projects':
        return (USER_COMMANDS.projects && USER_COMMANDS.projects.length)
          ? USER_COMMANDS.projects.map(p => {
            let out = '';
            if (p.title) out += `Title: ${p.title}\n`;
            if (p.description) out += `Description: ${p.description}\n`;
            if (p.tools) out += `Tools: ${p.tools}\n`;
            if (p.link) out += `Link: ${p.link}\n`;
            return out.trim();
          }).join('\n\n')
          : 'No projects info.';

      case 'education':
        return (USER_COMMANDS.education && USER_COMMANDS.education.length)
          ? USER_COMMANDS.education.map(e => `- ${e.degree} — ${e.college} (${e.year})${e.gpa ? ' — GPA: ' + e.gpa : ''}`).join('\n')
          : 'No education info.';
      case 'experience':
        return (USER_COMMANDS.experience && USER_COMMANDS.experience.length)
          ? USER_COMMANDS.experience.map(ex => `- ${ex.role} at ${ex.company} (${ex.duration})${ex.details ? '\n  ' + ex.details : ''}`).join('\n\n')
          : 'No experience info.';
      case 'contact':
        const _email = USER_COMMANDS.contact?.email || 'N/A';
        const _github = USER_COMMANDS.contact?.github || 'N/A';
        const _phone = USER_COMMANDS.contact?.phone || 'N/A';
        const _linkedIn = USER_COMMANDS.contact?.linkedIn || USER_COMMANDS.contact?.linkedin || 'N/A';
        return `Email: ${_email}\nGitHub: ${_github}\nPhone: ${_phone}\nLinkedIn: ${_linkedIn}`;
      case 'help':
        return 'Available commands: ' + availableCommands;
      case 'clear':
        return '';
      default:
        return `Command not found: ${cmd}`;
    }
  }

  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const historyDiv = document.getElementById('history');

  const availableCommands = getAvailableCommands().join(', ');
  const welcomeEntry = { command: '', output: `Welcome to your Terminal Portfolio! Type a command (${availableCommands}) or "help".` };

  let history = [welcomeEntry];

  // --- New variables for autocomplete and history navigation ---
  let commandHistory = [];
  let historyIndex = -1;
  let autocompleteMatches = [];
  let autocompleteIndex = -1;

  function renderHistory() {
    historyDiv.innerHTML = '';
    history.forEach(entry => {
      if (entry.command) {
        historyDiv.innerHTML += `<div class='user-command'><span class='prompt'>$</span> ${entry.command}</div>`;
      }
      const isError = entry.output.startsWith('Command not found');
      historyDiv.innerHTML += `<pre class='${isError ? 'error' : 'output'}'>${entry.output}</pre>`;
    });
    if (historyDiv.scrollHeight > historyDiv.clientHeight) {
      historyDiv.scrollTop = historyDiv.scrollHeight;
    } else {
      historyDiv.scrollTop = 0;
    }
  }

  function handleCommand(cmd) {
    if (cmd === 'clear') {
      history = [welcomeEntry];
      renderHistory();
      return;
    }
    const output = getCommandOutput(cmd);
    history.push({ command: cmd, output });
    renderHistory();
  }

  // --- Keyboard event handler for autocomplete and history navigation ---
  terminalInput.addEventListener('keydown', function(e) {
    const value = terminalInput.value || '';
    if (e.key === 'Tab') {
      e.preventDefault();
      // If input changed, recalculate matches
      if (
        autocompleteMatches.length === 0 ||
        !value ||
        !autocompleteMatches.some(cmd => cmd.startsWith(value))
      ) {
        autocompleteMatches = getAvailableCommands().filter(cmd => cmd.startsWith(value));
        autocompleteIndex = -1;
      }
      if (autocompleteMatches.length > 0) {
        autocompleteIndex = (autocompleteIndex + 1) % autocompleteMatches.length;
        terminalInput.value = autocompleteMatches[autocompleteIndex];
        terminalInput.select();
      }
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0) {
        historyIndex = Math.max(0, historyIndex - 1);
        terminalInput.value = commandHistory[historyIndex];
        terminalInput.select();
      }
      e.preventDefault();
      autocompleteMatches = [];
      autocompleteIndex = -1;
    } else if (e.key === 'ArrowDown') {
      if (commandHistory.length > 0) {
        historyIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        terminalInput.value = commandHistory[historyIndex];
        terminalInput.select();
      }
      e.preventDefault();
      autocompleteMatches = [];
      autocompleteIndex = -1;
    } else {
      autocompleteMatches = [];
      autocompleteIndex = -1;
    }
  });

  // --- Update submit handler to save commands to history ---
  terminalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const cmd = terminalInput.value.trim();
    if (!cmd) return;
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;
    handleCommand(cmd.toLowerCase());
    terminalInput.value = '';
    setTimeout(() => terminalInput.focus(), 0);
  });

  renderHistory();
  setTimeout(() => terminalInput.focus(), 0);

  // --- Draggable logic ---
  const container = document.getElementById('terminal-container');
  const header = document.getElementById('terminal-header');
  let dragging = false, offsetX = 0, offsetY = 0;

  function centerContainer() {
    const width = 700, height = 600;
    container.style.left = ((window.innerWidth - width) / 2) + 'px';
    container.style.top = ((window.innerHeight - height) / 2) + 'px';
  }
  centerContainer();

  header.addEventListener('mousedown', function(e) {
    dragging = true;
    offsetX = e.clientX - container.offsetLeft;
    offsetY = e.clientY - container.offsetTop;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  });

  function onDrag(e) {
    if (!dragging) return;
    container.style.left = (e.clientX - offsetX) + 'px';
    container.style.top = (e.clientY - offsetY) + 'px';
  }
  function stopDrag() {
    dragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  }

  window.addEventListener('resize', centerContainer);

});
