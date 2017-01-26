import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import { BookDetail } from './platform/book-detail/book-detail.effect';
import { detailReducer } from './platform/book-detail/book-detail.reducer';

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
    MaterialModule,
    AppRoutes,

    StoreModule.provideStore({
      search: searchReducer,
      detail: detailReducer
    }),
    EffectsModule.runAfterBootstrap(SearchEffect),
    EffectsModule.runAfterBootstrap(BookDetail),
    StoreDevtoolsModule.instrumentOnlyWithExtension()


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

