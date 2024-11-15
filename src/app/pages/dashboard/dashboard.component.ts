import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { WidgetComponent } from '../../components/widget/widget.component';
import { wrapGrid } from 'animate-css-grid';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import {
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import Chart from 'chart.js/auto';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WidgetsPanelComponent } from './widgets-panel/widgets-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgComponentOutlet,
    WidgetComponent,
    DashboardHeaderComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    MatSidenavModule,
    WidgetsPanelComponent,
  ],
  template: `
    <div cdkDropListGroup>
      <app-dashboard-header />
      <div
        #dashboard
        class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-[150px] gap-4"
      >
        @for (widget of store.addedWidgets(); track widget.id) {
        <app-widget
          [data]="widget"
          cdkDropList
          (cdkDropListDropped)="drop($event)"
          [cdkDropListData]="widget.id"
        />
        }
        <div cdkDropList (cdkDropListDropped)="drop($event)">
          <div></div>
        </div>
      </div>
    </div>
  `,
  providers: [DashboardService],
})
export default class DashboardComponent {
  dashboard = viewChild.required<ElementRef>('dashboard');

  store = inject(DashboardService);
  clearAnimations = () => {};

  ngOnInit() {
    const { unwrapGrid } = wrapGrid(this.dashboard().nativeElement, {
      duration: 300,
    });
    this.clearAnimations = unwrapGrid;

    Chart.defaults.color = 'gray';
  }

  ngOnDestroy() {
    this.clearAnimations();
  }

  drop(event: CdkDragDrop<number, any>) {
    const {
      previousContainer,
      container,
      item: { data },
    } = event;

    if (data) {
      this.store.addWidgetAtPosition(data, container.data);
      return;
    }

    this.store.updateWidgetPosition(previousContainer.data, container.data);
  }
}
