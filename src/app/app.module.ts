import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2APIModule } from '@flowup/ng2-api';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //Ng2APIModule.forRoot(environment.apiUrl, [])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
