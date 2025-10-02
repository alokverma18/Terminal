import { Injectable } from '@angular/core';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { PortfolioService } from './portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor(private portfolioService: PortfolioService) {}

  async exportPortfolio(): Promise<void> {
    const commands = this.portfolioService.getCommands();

    // --- Normalization logic ---
    const skillsRaw: any = commands['skills'];
    let skillsArray: string[] = [];
    if (Array.isArray(skillsRaw) && skillsRaw.every((s: any) => typeof s === 'string')) {
      skillsArray = skillsRaw;
    } else if (typeof skillsRaw === 'string') {
      skillsArray = skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean);
    } else if (Array.isArray(skillsRaw) && skillsRaw.every((g: any) => typeof g === 'object')) {
      skillsArray = skillsRaw.map((g: any) => {
        const parts: string[] = [];
        if (g.languages) parts.push(`Languages: ${g.languages}`);
        if (g.frameworks) parts.push(`Frameworks: ${g.frameworks}`);
        if (g.tools) parts.push(`Tools: ${g.tools}`);
        return parts.join(' | ');
      });
    } else if (skillsRaw && typeof skillsRaw === 'object') {
      if (skillsRaw.languages || skillsRaw.frameworks || skillsRaw.tools) {
        const parts: string[] = [];
        if (skillsRaw.languages) parts.push(`Languages: ${skillsRaw.languages}`);
        if (skillsRaw.frameworks) parts.push(`Frameworks: ${skillsRaw.frameworks}`);
        if (skillsRaw.tools) parts.push(`Tools: ${skillsRaw.tools}`);
        if (parts.length) skillsArray = [parts.join(' | ')];
      } else if (Array.isArray((skillsRaw as any).skills)) {
        skillsArray = (skillsRaw as any).skills;
      } else if (typeof (skillsRaw as any).skills === 'string') {
        skillsArray = (skillsRaw as any).skills.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
    }

    let educationArray: any[] = [];
    if (Array.isArray(commands['education'])) {
      educationArray = commands['education'];
    } else if (commands['education']) {
      educationArray = [commands['education']];
    }

    let experienceArray: any[] = [];
    if (Array.isArray(commands['experience'])) {
      experienceArray = commands['experience'];
    } else if (commands['experience']) {
      experienceArray = [commands['experience']];
    }

    const normalized = {
      name: commands['name'] || '',
      about: commands['about'] ||  '',
      skills: skillsArray,
      projects: Array.isArray(commands['projects']) ? commands['projects'] : (commands['projects'] ? [commands['projects']] : []),
      contact: commands['contact'] || { email: '', github: '' },
      education: educationArray,
      experience: experienceArray
    };

    // Load template files
    const [html, css, appJs] = await Promise.all([
      fetch('assets/terminal/index.html').then(r => r.text()),
      fetch('assets/terminal/styles.css').then(r => r.text()),
      fetch('assets/terminal/app.js').then(r => r.text())
    ]);

    // Inject user data
    const injectedAppJs = appJs.replace('__USER_COMMANDS__', JSON.stringify(normalized, null, 2));

    // Bundle files
    const zip = new JSZip();
    zip.file('index.html', html);
    zip.file('styles.css', css);
    zip.file('app.js', injectedAppJs);

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'terminal.zip');
  }
}
