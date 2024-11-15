import { computed, effect, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import ChannelAnalyticsComponent from '../pages/dashboard/widgets/channel-analytics.component';
import LatestCommentsComponent from '../pages/dashboard/widgets/latest-comments.component';
import LatestVideoComponent from '../pages/dashboard/widgets/latest-video.component';
import { SubscribersComponent } from '../pages/dashboard/widgets/subscribers.component';
import { ViewsComponent } from '../pages/dashboard/widgets/views.component';
import { WatchTimeComponent } from '../pages/dashboard/widgets/watch-time.component';
import { RevenueComponent } from '../pages/dashboard/widgets/revenue.component';
import { TrafficSourcesComponent } from '../pages/dashboard/widgets/traffic-sources.component';
import { PublishedVideosComponent } from '../pages/dashboard/widgets/published-videos.component';
import { IdeasComponent } from '../pages/dashboard/widgets/ideas.component';

@Injectable()
export class DashboardService {
  public readonly widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Channel Analytics',
      content: ChannelAnalyticsComponent,
      rows: 2,
      columns: 2,
    },
    {
      id: 2,
      label: 'Latest Comments',
      content: LatestCommentsComponent,
      rows: 2,
      columns: 1,
    },
    {
      id: 3,
      label: 'Latest Video',
      content: LatestVideoComponent,
      rows: 2,
      columns: 2,
    },
    {
      id: 5,
      label: 'Subscribers',
      content: SubscribersComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 6,
      label: 'Views',
      content: ViewsComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 7,
      label: 'Watch Time',
      content: WatchTimeComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 8,
      label: 'Revenue',
      content: RevenueComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 9,
      label: 'Traffic sources',
      content: TrafficSourcesComponent,
      rows: 2,
      columns: 2,
    },
    {
      id: 10,
      label: 'Published videos',
      content: PublishedVideosComponent,
      rows: 2,
      columns: 2,
    },
    {
      id: 11,
      label: 'Ideas for you',
      content: IdeasComponent,
      rows: 1,
      columns: 1,
    },
  ]);

  public readonly addedWidgets = signal<Widget[]>([]);

  public readonly widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((w) => w.id);
    return this.widgets().filter((w) => !addedIds.includes(w.id));
  });

  constructor() {
    this.fetchWidgets();
  }

  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach((widget) => {
        const content = this.widgets().find((w) => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      });
      this.addedWidgets.set(widgets);
    }
  }

  addWidget(widget: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), { ...widget }]);
  }

  addWidgetAtPosition(sourceWidgetId: number, destWidgetId: number) {
    const widgetToAdd = this.widgetsToAdd().find(
      (w) => w.id === sourceWidgetId
    );
    if (!widgetToAdd) {
      return;
    }

    const indexOfDestWidget = this.addedWidgets().findIndex(
      (w) => w.id === destWidgetId
    );

    const positionToAdd =
      indexOfDestWidget === -1 ? this.addedWidgets().length : indexOfDestWidget;

    const newWidgets = [...this.addedWidgets()];
    newWidgets.splice(positionToAdd, 0, { ...widgetToAdd });
    this.addedWidgets.set(newWidgets);
  }

  updateWidget(id: number, data: Partial<Widget>) {
    const indexToUpdate = this.addedWidgets().findIndex((w) => w.id === id);
    if (indexToUpdate !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[indexToUpdate] = { ...newWidgets[indexToUpdate], ...data };
      this.addedWidgets.set(newWidgets);
    }
  }

  moveWidgetRight(id: number) {
    const indexToMove = this.addedWidgets().findIndex((w) => w.id === id);
    if (indexToMove === this.addedWidgets().length - 1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[indexToMove], newWidgets[indexToMove + 1]] = [
      { ...newWidgets[indexToMove + 1] },
      { ...newWidgets[indexToMove] },
    ];
    this.addedWidgets.set(newWidgets);
  }

  moveWidgetLeft(id: number) {
    const indexToMove = this.addedWidgets().findIndex((w) => w.id === id);
    if (indexToMove === 0) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[indexToMove], newWidgets[indexToMove - 1]] = [
      { ...newWidgets[indexToMove - 1] },
      { ...newWidgets[indexToMove] },
    ];
    this.addedWidgets.set(newWidgets);
  }

  removeWidget(id: number) {
    this.addedWidgets.set([...this.addedWidgets().filter((w) => w.id !== id)]);
  }

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    const sourceIndex = this.addedWidgets().findIndex(
      (w) => w.id === sourceWidgetId
    );
    if (sourceIndex === -1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    const sourceWidget = newWidgets.splice(sourceIndex, 1)[0];

    const targetIndex = newWidgets.findIndex((w) => w.id === targetWidgetId);
    if (targetIndex === -1) {
      return;
    }

    const insertAt =
      sourceIndex === targetIndex ? targetIndex + 1 : targetIndex;

    newWidgets.splice(insertAt, 0, sourceWidget);
    this.addedWidgets.set(newWidgets);
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(
      (w) => ({ ...w })
    );
    widgetsWithoutContent.forEach((w) => {
      delete w.content;
    });

    localStorage.setItem(
      'dashboardWidgets',
      JSON.stringify(widgetsWithoutContent)
    );
  });
}
