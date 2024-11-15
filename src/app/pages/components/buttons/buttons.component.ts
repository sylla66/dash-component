import { Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckbox,
    MatFormFieldModule,
    MatIcon,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatBadge,
    MatDatepickerModule,
    MatInput,
    MatSelectModule,
    MatListModule,
    MatProgressBar,
    MatProgressSpinner,
    MatRadioModule,
    MatSlideToggle,
    MatSliderModule,
  ],
  template: `
    <button mat-stroked-button>Stroked Button</button>

    <button mat-raised-button><mat-icon>person</mat-icon>Raised Button</button>

    <button mat-flat-button>Flat Button</button>

    <button mat-button>Simple Button</button>

    <div class="flex-row">
      <button mat-icon-button>
        <mat-icon>home</mat-icon>
      </button>

      <button mat-fab>
        <mat-icon>delete</mat-icon>
      </button>

      <button mat-mini-fab>
        <mat-icon>home</mat-icon>
      </button>
    </div>

    <button mat-raised-button matBadge="7">Hide</button>

    <button mat-raised-button (click)="openSnackbar()">Snack bar</button>
  `,
  styles: `
  
  :host {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    align-items: center;
    gap: 24px;
  }

  `,
})
export default class ButtonsComponent {
  snackbar = inject(MatSnackBar);

  openSnackbar() {
    this.snackbar.open('Hello there...', 'CLOSE');
  }
}
