import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { GRBook } from '../models/goodreadsBook.model';
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
export class SearcherComponent implements OnInit {

  books: GRBook[] = [];
  key: string = '';
  loading: boolean = false;
  userInputChange: Subject<string> = new Subject<string>();
  tether: Tether;

  showDropdown: boolean = false;

  @ViewChild('dropdown') dropdown: ElementRef;


  constructor(private store: Store<AppState>, private elRef: ElementRef, private router: Router) {
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

  selected(book: GRBook) {
    this.showDropdown = false;
    this.router.navigate(['platform/detail']);
  }


}
