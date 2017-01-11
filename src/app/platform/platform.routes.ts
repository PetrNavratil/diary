import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';

export const platformRoutes: Routes = [{
  path: '',
  children: [
    {path: '', component: DashboardComponent},
    {
      path: 'search', component: SearchComponent
    }
  ]
}];

