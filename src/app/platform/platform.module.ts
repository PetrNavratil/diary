import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformComponent } from './platform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { GoogleResource } from '../shared/resources/googleBooks';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    GoogleResource
  ],
  declarations: [
    PlatformComponent,
    DashboardComponent,
    SearchComponent,
  ],
  exports: []
})
export class PlatformModule {
}
