import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormControl, FormsModule} from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('historyRef', { static: false }) historyRef!: ElementRef<HTMLDivElement>;
  commandInput = new FormControl('');
  history: { command: string, output: string }[] = [];
  commands: any = {};
  title: string = 'Terminal Portfolio Preview';
  allowedCommands = ['name', 'about', 'skills', 'projects', 'education', 'experience', 'contact', 'help', 'clear', 'export'];

  commandHistory: string[] = [];
  historyIndex: number = -1;

  autocompleteMatches: string[] = [];
  autocompleteIndex: number = -1;

  position = { top: 100, left: 100 };
  private dragging = false;
  private dragOffset = { x: 0, y: 0 };

  constructor(
    private portfolioService: PortfolioService,
    private fb: FormBuilder,
    private exportService: ExportService
  ) {}

  ngOnInit() {
    const width = 700; // match .terminal-container max-width
    const height = 700; // match .terminal-container height
    this.position.left = (window.innerWidth - width) / 2;
    this.position.top = (window.innerHeight - height) / 2;

    this.commands = this.portfolioService.getCommands();
    this.printWelcome();
    this.title = this.commands.name;

    // make sure the terminal shows the welcome and input in view
    setTimeout(() => {
      this.scrollHistoryToBottom();
      this.inputRef?.nativeElement.focus();
      this.inputRef?.nativeElement.addEventListener('keydown', (e: KeyboardEvent) => this.handleKeyDown(e));
    }, 0);
  }

  startDrag(event: MouseEvent) {
    this.dragging = true;
    this.dragOffset.x = event.clientX - this.position.left;
    this.dragOffset.y = event.clientY - this.position.top;
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);
  }

  onDrag = (event: MouseEvent) => {
    if (this.dragging) {
      this.position.left = event.clientX - this.dragOffset.x;
      this.position.top = event.clientY - this.dragOffset.y;
    }
  };

  stopDrag = () => {
    this.dragging = false;
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
  };

  printWelcome() {
    const available = Object.keys(this.commands).filter(k => this.allowedCommands.includes(k));
    this.history.push({
      command: '',
      output: 'Welcome to your Terminal Portfolio! Type a command (' + available.join(', ') + ') or "help".'
    });
  }

  private scrollHistoryToBottom() {
    try {
      if (this.historyRef && this.historyRef.nativeElement) {
        const el = this.historyRef.nativeElement;
        // Only scroll when content overflows the container — otherwise keep input right after content
        if (el.scrollHeight > el.clientHeight) {
          el.scrollTop = el.scrollHeight;
        } else {
          el.scrollTop = 0;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  onSubmit() {
    const cmd = this.commandInput.value?.trim();
    if (!cmd) return;
    this.commandHistory.push(cmd);
    this.historyIndex = this.commandHistory.length;
    let output = '';
    if (cmd === 'help') {
      const available = Object.keys(this.commands).filter(k => this.allowedCommands.includes(k));
      output = 'Available commands: ' + available.join(', ');
    } else if (cmd === 'clear') {
      this.history = [];
      this.commandInput.setValue('');
      this.printWelcome();
      // scroll after clearing
      setTimeout(() => this.scrollHistoryToBottom(), 0);
      return;
    } else if (cmd === 'export') {
      output = 'Exporting your terminal portfolio...';
      setTimeout(() => this.export(), 500);
    } else if (this.commands[cmd]) {
      output = this.formatOutput(cmd, this.commands[cmd]);
    } else {
      output = `Command not found: ${cmd}`;
    }
    this.history.push({ command: cmd, output });
    this.commandInput.setValue('');
    // Wait a tick for the template to update and then scroll & focus
    setTimeout(() => {
      this.scrollHistoryToBottom();
      this.inputRef?.nativeElement.focus();
    }, 0);
  }

  formatOutput(cmd: string, data: any): string {
    if (cmd === 'about') return data || '';
    if (cmd === 'skills') {
      const raw = (data && data.skills !== undefined) ? data.skills : data;
      if (Array.isArray(raw)) {
        // array of objects/groups
        return raw.map((g: any) => {
          let out = '';
          if (g.languages) out += `Languages: ${g.languages}\n`;
          if (g.frameworks) out += `Frameworks: ${g.frameworks}\n`;
          if (g.tools) out += `Tools: ${g.tools}\n`;
          return out.trim();
        }).join('\n\n');
      }
      if (typeof raw === 'object' && raw !== null) {
        let out = '';
        if (raw.languages) out += `Languages: ${raw.languages}\n`;
        if (raw.frameworks) out += `Frameworks: ${raw.frameworks}\n`;
        if (raw.tools) out += `Tools: ${raw.tools}\n`;
        return out.trim();
      }
      return typeof raw === 'string' ? raw : 'No skills info.';
    }
    if (cmd === 'projects') {
      if (Array.isArray(data)) {
        return data.map((p: any) => {
          let out = '';
          if (p.title) out += ` ${p.title}\n`;
          if (p.description) out += `- ${p.description}\n`;
          if (p.tools) out += `Tools: ${p.tools}\n`;
          if (p.link) out += `Link: ${p.link}\n`;
          return out.trim();
        }).join('\n\n');
      }
      let out = '';
      if (data.title) out += ` ${data.title}\n`;
      if (data.description) out += `- ${data.description}\n`;
      if (data.tools) out += `Tools: ${data.tools}\n`;
      if (data.link) out += `Link: ${data.link}\n`;
      return out.trim();
    }
    if (cmd === 'education') {
      if (Array.isArray(data)) {
        return data.map((e: any) => `- ${e.degree} — ${e.college} (${e.year})${e.gpa ? ' — GPA: ' + e.gpa : ''}`).join('\n');
      }
      return `- ${data.degree} — ${data.college} (${data.year})${data.gpa ? ' — GPA: ' + data.gpa : ''}`;
    }
    if (cmd === 'experience') {
      if (Array.isArray(data)) {
        return data.map((ex: any) => `- ${ex.role} at ${ex.company} (${ex.duration})${ex.details ? '\n  ' + ex.details : ''}`).join('\n\n');
      }
      return `- ${data.role} at ${data.company} (${data.duration})${data.details ? '\n' + data.details : ''}`;
    }
    if (cmd === 'contact') {
      const contact = data || {};
      let output = '';
      if (contact.email) output += `Email: ${contact.email}\n`;
      if (contact.github) output += `GitHub: ${contact.github}\n`;
      if (contact.linkedIn || contact.linkedin) output += `LinkedIn: ${contact.linkedIn || contact.linkedin}\n`;
      if (contact.phone) output += `Phone: ${contact.phone}\n`;
      return output.trim();
    }
    return typeof data === 'string' ? data : JSON.stringify(data);
  }

  trackByIndex(i: number) { return i; }

  export() {
    this.exportService.exportPortfolio();
  }

  handleKeyDown(e: KeyboardEvent) {
    const value = this.commandInput.value || '';
    if (e.key === 'Tab') {
      e.preventDefault();
      // If input changed, recalculate matches
      if (
        this.autocompleteMatches.length === 0 ||
        !value ||
        !this.autocompleteMatches.some(cmd => cmd.startsWith(value))
      ) {
        this.autocompleteMatches = this.allowedCommands.filter(cmd => cmd.startsWith(value));
        this.autocompleteIndex = -1;
      }
      if (this.autocompleteMatches.length > 0) {
        this.autocompleteIndex = (this.autocompleteIndex + 1) % this.autocompleteMatches.length;
        this.commandInput.setValue(this.autocompleteMatches[this.autocompleteIndex]);
        setTimeout(() => this.inputRef?.nativeElement.select(), 0);
      }
    } else {
      // Reset autocomplete state on any other key
      this.autocompleteMatches = [];
      this.autocompleteIndex = -1;
      // ... rest of your ArrowUp/ArrowDown logic ...
      if (e.key === 'ArrowUp') {
        if (this.commandHistory.length > 0) {
          this.historyIndex = Math.max(0, this.historyIndex - 1);
          this.commandInput.setValue(this.commandHistory[this.historyIndex]);
          setTimeout(() => this.inputRef?.nativeElement.select(), 0);
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (this.commandHistory.length > 0) {
          this.historyIndex = Math.min(this.commandHistory.length - 1, this.historyIndex + 1);
          this.commandInput.setValue(this.commandHistory[this.historyIndex]);
          setTimeout(() => this.inputRef?.nativeElement.select(), 0);
        }
        e.preventDefault();
      }
    }
  }

}
