import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2APIModule } from '@flowup/ng2-api';
import { environment } from '../environments/environment';
import { MaterialModule } from '@angular/material';
import { LandingModule } from './landing/landing.module';
import { AppRoutes } from './app.routes';
import { PlatformModule } from './platform/platform.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LandingModule,
    PlatformModule,
    //Ng2APIModule.forRoot(environment.apiUrl, []),
    //MaterialModule.forRoot(),

    AppRoutes



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
