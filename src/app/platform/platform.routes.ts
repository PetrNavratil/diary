import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const platformRoutes: Routes = [{
  path: '',
  children: [
    {path: '', component: DashboardComponent}
  ]
}];

