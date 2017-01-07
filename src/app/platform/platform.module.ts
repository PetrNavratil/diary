import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformComponent } from './platform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    PlatformComponent,
    DashboardComponent,
  ],
  exports: []
})
export class PlatformModule {
}
