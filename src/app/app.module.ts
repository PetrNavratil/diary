import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { LandingModule } from './landing/landing.module';
import { AppRoutes } from './app.routes';
import { PlatformModule } from './platform/platform.module';
import { StoreModule } from '@ngrx/store';
import { Ng2APIModule, APIConfig } from '@flowup/ng2-api';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import 'hammerjs';
import { searchReducer } from './reducers/search.reducer';
import { SearchEffect } from './effects/search.effect';
import { detailReducer } from './reducers/book-detail.reducer';
import { BookDetail } from './effects/book-detail.effect';
import { environment } from '../environments/environment';
import { AuthEffect } from './effects/auth.effect';
import { authReducer } from './reducers/auth.reducer';

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

    AppRoutes,

    StoreModule.provideStore({
      search: searchReducer,
      detail: detailReducer,
      auth: authReducer
    }),
    EffectsModule.runAfterBootstrap(SearchEffect),
    EffectsModule.runAfterBootstrap(BookDetail),
    EffectsModule.runAfterBootstrap(AuthEffect),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

