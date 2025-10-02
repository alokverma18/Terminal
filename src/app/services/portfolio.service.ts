import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private commands: { [key: string]: any } = {export: ''};

  setCommandData(command: string, data: any) {
    const multiCommands = ['projects', 'education', 'experience'];
    if (multiCommands.includes(command)) {
      // Store as a flat array
      this.commands[command] = Array.isArray(data) ? data : [data];
    } else {
      this.commands[command] = data;
    }
    this.saveToStorage();
  }

  getCommands(): { [key: string]: any } {
    this.loadFromStorage()
    if (!this.commands['export']) {
      this.commands['export'] = '';
    }
    return this.commands;
  }

  clearCommands() {
    this.commands = {};
    localStorage.removeItem('portfolio_commands');
  }

  private saveToStorage() {
    localStorage.setItem('portfolio_commands', JSON.stringify(this.commands));
  }

  private loadFromStorage() {
    const data = localStorage.getItem('portfolio_commands');
    if (data) {
      try {
        const parsed = JSON.parse(data);

        ['projects', 'education', 'experience'].forEach(key => {
          if (parsed.hasOwnProperty(key) && parsed[key] && !Array.isArray(parsed[key])) {
            parsed[key] = [parsed[key]];
          }
        });

        this.commands = parsed;
      } catch (err) {
        this.commands = {};
      }
    }
  }

}
