import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [CommonModule],
  standalone: true,
  template: `<div class="smth-went-wrong">
    <p class="error">Ups coś poszło nie tak... 😢</p>
    <p class="error">Spróbuj ponownie</p>
  </div> `,
  styles: [
    '.smth-went-wrong { text-align: center}',
    '.error {font-size: 4rem; font-weight: 600; color: var(--primary-darker)}',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {}
