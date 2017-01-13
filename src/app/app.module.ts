import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { LandingModule } from './landing/landing.module';
import { AppRoutes } from './app.routes';
import { PlatformModule } from './platform/platform.module';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from './shared/searcher/search.reducer';
import { MaterialModule } from '@angular/material';
import { Ng2APIModule } from '@flowup/ng2-api';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffect } from './shared/searcher/search.effect';

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
    AppRoutes,

    StoreModule.provideStore({
      search: searchReducer
    }),
    EffectsModule.runAfterBootstrap(SearchEffect),
    StoreDevtoolsModule.instrumentOnlyWithExtension()



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

