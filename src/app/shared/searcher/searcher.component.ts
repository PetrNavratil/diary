import { Component, OnInit } from '@angular/core';
import { GRBook } from '../models/goodreadsBook.model';
import { AppState, StoreModel } from '../models/store-model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as Tether from 'tether';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  books: GRBook[] = [];
  key: string = '';
  loading: boolean = false;
  userInputChange: Subject<string> = new Subject<string>();


  constructor(private store: Store<AppState>) {
    this.store.select('search').subscribe(
      (data) => {
        let tmp = <StoreModel<GRBook>>data;
        if (!tmp.error) {
          console.log('data arrived');
          this.books = tmp.data;
          console.log('books are', this.books);
          this.loading = false;
        } else {
          console.log('error has occured');
        }
      }
    );

    this.userInputChange
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(value => {
        console.log(value);
        this.store.dispatch({type: 'GET_SEARCH', payload: value});
        return value;
      })
  }

  ngOnInit() {

    new Tether({
      element: '.search-input',
      target: '.dropdown',
      attachment: 'bottom left',
      targetAttachment: 'top left'
    });

    // new Tether({
    //   element: '.search-input',
    //   target: '.search-icon-tether',
    //   attachment: 'middle left',
    //   targetAttachment: 'middle left'
    // })
  }


  changed(value: string) {
    console.log('changed');
    this.loading = true;
    this.userInputChange.next(value);
  }


}
