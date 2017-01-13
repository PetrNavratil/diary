import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearcherComponent } from './searcher/searcher.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
  ],
  declarations: [
    ToolbarComponent,
    SearcherComponent,
    LoaderComponent,
  ],
  exports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,

    ToolbarComponent,
    SearcherComponent,
    LoaderComponent
  ]
})
export class SharedModule {
}
