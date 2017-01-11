import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
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
