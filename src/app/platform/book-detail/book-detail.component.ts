import { Component, AfterViewChecked, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../shared/models/store-model';
import { Store } from '@ngrx/store';
import { GRBook } from '../../shared/models/goodreadsBook.model';
import * as Tether from 'tether';
import { ComponentDispatcher, squirrel, SquirrelData } from '@flowup/squirrel';
import { ActivatedRoute } from '@angular/router';
import { detailActions } from '../../reducers/book-detail.reducer';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, AfterViewChecked, OnDestroy {

  book: GRBook;
  tether: Tether;
  selectedTab: number = 0;
  tabs: string[] = [
    'Good Reads',
    'Google Books',
    'Amazon',
    'Something'
  ];
  dispatcher: ComponentDispatcher;
  subscriptions: any[] = [];
  loading: boolean = false;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.dispatcher = new ComponentDispatcher(store, this);
    this.route.params.subscribe(params => {
      let id = +params['id'];
      if (id) {
        this.dispatcher.dispatch(detailActions.API_GET, params['id']);
      }
    });
    let {dataStream, errorStream} = squirrel(store, 'detail', this);
    this.subscriptions.push(
      dataStream.subscribe(
        (data: SquirrelData<GRBook>) => {
          console.log('data', data);
          if (!data.data.length) {
            return;
          }
          this.book = Object.assign({}, data.data[0]);
          let div = document.createElement('div');
          div.innerHTML = this.book.description;
          this.book.description = div.textContent || div.innerText || '';
          console.log('book', this.book);
        }
      )
    );
    this.subscriptions.push(
      errorStream.subscribe(
        (error: Error) => {
          console.error(error);
          this.loading = false;
        }
      )
    );

  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
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
