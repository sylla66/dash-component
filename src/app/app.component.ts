import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    CustomSidenavComponent,
    HeaderComponent,
  ],
  template: `
    <app-header [(collapsed)]="collapsed" />
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-custom-sidenav [collapsed]="collapsed()" />
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .content {
        padding: 24px;
        box-sizing: border-box;
      }

      mat-sidenav-container {
        height: calc(100vh - 64px);
      }

      mat-sidenav-content {
        transition: margin-left 500ms ease-in-out;
      }

      mat-sidenav {
        transition: width 500ms ease-in-out;
      }

      mat-sidenav {
        --mat-sidenav-container-divider-color: var(--sys-outline-variant);
        --mat-sidenav-container-shape: 0px;
      }
    `,
  ],
})
export class AppComponent {
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
}
