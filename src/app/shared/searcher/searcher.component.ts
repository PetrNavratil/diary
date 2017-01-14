import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { GRSearchBook } from '../models/goodreadsBook.model';
import { AppState, StoreModel } from '../models/store-model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as Tether from 'tether';
import { Router } from '@angular/router';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit, OnDestroy {

  books: GRSearchBook[] = [];
  key: string = '';
  loading: boolean = false;
  userInputChange: Subject<string> = new Subject<string>();
  tether: Tether;

  showDropdown: boolean = false;
  subscription: any;

  @ViewChild('dropdown') dropdown: ElementRef;


  constructor(private store: Store<AppState>, private elRef: ElementRef, private router: Router) {
    this.subscription = this.store.select('search').subscribe(
      (data) => {
        let tmp = <StoreModel<GRSearchBook>>data;
        if (!tmp.error) {
          console.log('data arrived');
          this.books = tmp.data;
          console.log('books are', this.books);
          this.loading = false;
        } else {
          console.log('error has occured');
        }

        if (this.books.length) {
          this.showDropdown = true;
          this.tether.enable();
        }
      }
    );

    this.userInputChange
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(value => {
        if (value === '') {
          this.loading = false;
          return;
        }
        this.store.dispatch({type: 'GET_SEARCH', payload: value});
        return value;
      });

    document.body.addEventListener('click', (event) => {
      if (!this.elRef.nativeElement.contains(event.target)) {
        this.showDropdown = false;
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.tether.destroy();
  }

  ngOnInit() {
    this.tether = new Tether({
      element: '.dropdown',
      target: '.search-input',
      attachment: 'top left',
      targetAttachment: 'bottom left',
      enabled: false
    });
  }


  changed(value: string) {
    this.loading = true;
    this.userInputChange.next(value);
  }

  displayDropdown() {
    if (this.books.length) {
      this.showDropdown = true;
    }
  }

  selected(book: GRSearchBook) {
    this.showDropdown = false;
    this.store.dispatch({type: 'GET_DETAIL', payload: book.id});
    this.router.navigate(['platform/detail']);
  }


}
