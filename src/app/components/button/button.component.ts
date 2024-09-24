import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() buttonText: string;
  @Input() buttonType: string;
  @Input() loading: boolean;

  constructor() {
    this.loading = false;
    this.buttonText = '';
    this.buttonType = '';
  }
}
