import { Component, input, model } from '@angular/core';
import { Widget } from '../../../models/dashboard';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-widget-header',
  standalone: true,
  imports: [MatIcon, MatButtonModule, CdkDragHandle],
  template: `
    <div
      class="flex flex-row justify-between items-center cursor-move mb-3"
      [style.--mdc-icon-button-icon-color]="data().color ?? 'inherit'"
    >
      <h3 class="text-xl">{{ data().label }}</h3>
      <div class="absolute top-[20px] right-[20px]">
        <button mat-icon-button (click)="showOptions.set(true)">
          <mat-icon>settings</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: `
  
  `,
})
export class WidgetHeaderComponent {
  data = input.required<Widget>();

  showOptions = model.required<boolean>();
}
