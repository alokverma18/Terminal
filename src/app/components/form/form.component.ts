import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { TagInputComponent } from '../tag-input/tag-input.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TagInputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  resumeForm: FormGroup;
  resumeData: any = null;

  // Arrays for tag inputs
  skillsLanguages: string[] = [];
  skillsFrameworks: string[] = [];
  skillsTools: string[] = [];
  projectTools: string[][] = [];

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
    private router: Router) {
    this.resumeForm = this.fb.group({
      name: ['', Validators.required],
      about: ['', Validators.required],
      contact: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        linkedIn: [''],
        github: ['']
      }),
      education: this.fb.array([]),
      experience: this.fb.array([]),
      projects: this.fb.array([]),
      skills: this.createSkillFormGroup()
    });
  }

  ngOnInit() {
    const saved = localStorage.getItem('portfolio_commands');
    const flatten = (arr: any) => Array.isArray(arr) && Array.isArray(arr[0]) ? arr.flat() : arr;

    if (saved) {
      const commands = JSON.parse(saved);

      this.resumeForm.patchValue({
        name: commands.name || '',
        about: commands.about || '',
        contact: commands.contact || {},
        skills: commands.skills || {}
      });

      // Patch education
      this.education.clear();
      const educationArr = flatten(commands.education || []);
      educationArr.forEach((e: any) => {
        this.education.push(this.fb.group({
          degree: [e.degree || '', Validators.required],
          college: [e.college || '', Validators.required],
          year: [e.year || '', Validators.required],
          gpa: [e.gpa || '']
        }));
      });
      if (this.education.length === 0) this.addEducation();

      // Patch experience
      this.experience.clear();
      const experienceArr = flatten(commands.experience || []);
      experienceArr.forEach((ex: any) => {
        this.experience.push(this.fb.group({
          role: [ex.role || '', Validators.required],
          company: [ex.company || '', Validators.required],
          duration: [ex.duration || '', Validators.required],
          details: [ex.details || '']
        }));
      });
      if (this.experience.length === 0) this.addExperience();

      // Patch projects
      this.projects.clear();
      const projectsArr = flatten(commands.projects || []);
      projectsArr.forEach((p: any) => {
        this.projects.push(this.fb.group({
          title: [p.title || '', Validators.required],
          description: [p.description || ''],
          tools: [p.tools || ''],
          link: [p.link || '']
        }));
      });
      if (this.projects.length === 0) this.addProject();

      // Patch skills arrays
      this.skillsLanguages = (commands.skills?.languages || '').split(',').map((s: string) => s.trim()).filter((s: string) => s);
      this.skillsFrameworks = (commands.skills?.frameworks || '').split(',').map((s: string) => s.trim()).filter((s: string) => s);
      this.skillsTools = (commands.skills?.tools || '').split(',').map((s: string) => s.trim()).filter((s: string) => s);

      // Patch project tools arrays
      this.projectTools = projectsArr.map((p: any) =>
        (p.tools || '').split(',').map((t: string) => t.trim()).filter((t: string) => t)
      );
    } else {
      this.addEducation();
      this.addExperience();
      this.addProject();
      this.projectTools = [ [] ];
    }
  }

  get education(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }

  get experience(): FormArray {
    return this.resumeForm.get('experience') as FormArray;
  }

  get projects(): FormArray {
    return this.resumeForm.get('projects') as FormArray;
  }

  get skills(): FormGroup {
    return this.resumeForm.get('skills') as FormGroup;
  }

  get contact(): FormGroup {
    return this.resumeForm.get('contact') as FormGroup;
  }

  createEducationFormGroup(): FormGroup {
    return this.fb.group({
      degree: ['', Validators.required],
      college: ['', Validators.required],
      year: ['', Validators.required],
      gpa: ['']
    });
  }

  createExperienceFormGroup(): FormGroup {
    return this.fb.group({
      role: ['', Validators.required],
      company: ['', Validators.required],
      duration: ['', Validators.required],
      details: ['']
    });
  }

  createProjectFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: [''],
      tools: [''],
      link: ''
    });
  }

  createSkillFormGroup(): FormGroup {
    return this.fb.group({
      languages: [''],
      frameworks: [''],
      tools: ['']
    });
  }

  addEducation(): void {
    this.education.push(this.createEducationFormGroup());
  }

  removeEducation(index: number): void {
    this.education.removeAt(index);
  }

  addExperience(): void {
    this.experience.push(this.createExperienceFormGroup());
  }

  removeExperience(index: number): void {
    this.experience.removeAt(index);
  }

  addProject(): void {
    this.projects.push(this.createProjectFormGroup());
    this.projectTools.push([]);
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
    this.projectTools.splice(index, 1);
  }

  // Tag input handlers for skills
  onSkillsLanguagesChange(tags: string[]) {
    this.skillsLanguages = tags;
    this.resumeForm.get('skills.languages')?.setValue(tags.join(', '));
  }
  onSkillsFrameworksChange(tags: string[]) {
    this.skillsFrameworks = tags;
    this.resumeForm.get('skills.frameworks')?.setValue(tags.join(', '));
  }
  onSkillsToolsChange(tags: string[]) {
    this.skillsTools = tags;
    this.resumeForm.get('skills.tools')?.setValue(tags.join(', '));
  }

  // Tag input handler for project tools
  onProjectToolsChange(tags: string[], i: number) {
    this.projectTools[i] = tags;
    this.projects.at(i).get('tools')?.setValue(tags.join(', '));
  }

  onSubmit(): void {
    if (this.resumeForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    const val = this.resumeForm.value;
    const flatten = (arr: any) => Array.isArray(arr) && Array.isArray(arr[0]) ? arr.flat() : arr;

    this.portfolioService.clearCommands();

    this.portfolioService.setCommandData('name', val.name || '');
    this.portfolioService.setCommandData('about', val.about || '');
    this.portfolioService.setCommandData('contact', val.contact || {});
    this.portfolioService.setCommandData('education', flatten(val.education) || []);
    this.portfolioService.setCommandData('experience', flatten(val.experience) || []);
    this.portfolioService.setCommandData('projects', flatten(val.projects) || []);
    this.portfolioService.setCommandData('skills', val.skills || {});

    this.resumeData = val;

    try {
      this.router.navigate(['/preview']);
    } catch (e) {
      // ignore navigation errors in standalone mode
    }
  }
}
