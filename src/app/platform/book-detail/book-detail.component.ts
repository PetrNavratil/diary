import { Component, OnInit } from '@angular/core';
import { AppState, StoreModel } from '../../shared/models/store-model';
import { Store } from '@ngrx/store';
import { GRBook } from '../../shared/models/goodreadsBook.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book: GRBook;

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
  }

}
