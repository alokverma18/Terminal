import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tag-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css']
})
export class TagInputComponent {
  @Input() tags: string[] = [];
  @Output() tagsChange = new EventEmitter<string[]>();
  inputValue = '';

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addTag();
    }
  }

  addTagOnBlur() {
    if (this.inputValue.trim()) {
      this.addTag();
    }
  }

  addTag() {
    const value = this.inputValue.trim().replace(/,$/, '');
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
      this.tagsChange.emit(this.tags);
    }
    this.inputValue = '';
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
    this.tagsChange.emit(this.tags);
  }
}
