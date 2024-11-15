import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [MatProgressBarModule, MatProgressSpinner],
  template: `
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    <br />
    <br />
    <mat-spinner></mat-spinner>
  `,
  styles: ``,
})
export default class ProgressComponent {}
