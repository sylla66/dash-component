import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardService } from '../../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { WidgetsPanelComponent } from '../widgets-panel/widgets-panel.component';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    MatIcon,
    MatMenuModule,
    MatButtonModule,
    WidgetsPanelComponent,
    CdkDropList,
    CdkDrag,
  ],
  template: `
    <div
      class="flex flex-row items-center justify-between mb-4 position-relative"
    >
      <h2 class="text-2xl">Channel Dashboard</h2>
      @if (widgetsOpen()) {
      <app-widgets-panel
        cdkDropList
        cdkDropListOrientation="vertical"
        (cdkDropListDropped)="widgetDroppedInPanel($event)"
        class="mat-elevation-z8"
        cdkDrag
      />
      }
      <button mat-flat-button (click)="widgetsOpen.set(!widgetsOpen())">
        @if(widgetsOpen()) {
        <mat-icon>close</mat-icon>
        } @else {
        <mat-icon>add_circle</mat-icon>
        } Widgets
      </button>
    </div>
  `,
  styles: `
  `,
})
export class DashboardHeaderComponent {
  store = inject(DashboardService);

  widgetsOpen = signal(false);

  widgetDroppedInPanel(event: CdkDragDrop<number, any>) {
    const { previousContainer } = event;
    this.store.removeWidget(previousContainer.data);
  }
}
