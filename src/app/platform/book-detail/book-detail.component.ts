import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AppState, StoreModel } from '../../shared/models/store-model';
import { Store } from '@ngrx/store';
import { GRBook } from '../../shared/models/goodreadsBook.model';
import * as Tether from 'tether';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, AfterViewChecked {

  book: GRBook;
  tether: Tether;
  selectedTab: number = 0;
  tabs: string[] = [
    'Good Reads',
    'Google Books',
    'Amazon',
    'Something'
  ];

  constructor(private store: Store<AppState>) {
    this.store.select('detail').subscribe(
      data => {
        let tmpData = <StoreModel<GRBook>>data;
        if (!tmpData.data.length) {
          return;
        }
        this.book = tmpData.data[0];
        let div = document.createElement("div");
        div.innerHTML = this.book.description;
        this.book.description = div.textContent || div.innerText || '';
      }
    );

  }

  ngOnInit() {
    this.tether = new Tether({
      element: '.triangle',
      target: '.tabs-container',
      attachment: 'top left',
      targetAttachment: 'top right',
      enabled: false
    })
  }

  ngAfterViewChecked() {
    this.tether.enable();
    this.tether.position();
  }

  selectTab(index: number) {
    this.selectedTab = index;
    let offset = index * 40;
    this.tether.setOptions({
      element: '.triangle',
      target: '.tabs-container',
      attachment: 'top left',
      targetAttachment: 'top right',
      targetOffset: `${offset}px 0`
    });
  }

}
