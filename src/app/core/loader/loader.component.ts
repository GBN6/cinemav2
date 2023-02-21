import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { LoaderService } from '../interceptor/loader-handler.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader[diameter]',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div *ngIf="isLoading$ | async">
      <div class="loader">
        <mat-spinner [diameter]="diameter"></mat-spinner>
        <p class="loading">Ładowanie...</p>
      </div>
    </div>
  `,
  styles: [
    '.loader { display: flex; justify-content: center; align-items: center; flex-direction: column; margin-top: 1rem}',
    '.loading {font-size: 2rem; font-weight: 600; color: var(--primary-darker)}',
    '::ng-deep .mat-mdc-progress-spinner {--mdc-circular-progress-active-indicator-color: var(--primary);}',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatLoaderComponent {
  @Input() diameter!: number;
  private loaderService = inject(LoaderService);
  isLoading$ = this.loaderService.isLoading$;
}
