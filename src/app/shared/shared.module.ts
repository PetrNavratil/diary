import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearcherComponent } from './searcher/searcher.component';
import { LoaderComponent } from './loader/loader.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CardComponent } from './card/card.component';

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
    SideNavComponent,
    CardComponent,
  ],
  exports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,

    ToolbarComponent,
    SearcherComponent,
    LoaderComponent,
    SideNavComponent,
    CardComponent
  ]
})
export class SharedModule {
}
