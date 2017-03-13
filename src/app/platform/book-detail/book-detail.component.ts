import { Component, AfterViewChecked, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../shared/models/store-model';
import { Store } from '@ngrx/store';
import { GRBook } from '../../shared/models/goodreadsBook.model';
import * as Tether from 'tether';
import { ComponentDispatcher, squirrel, SquirrelData } from '@flowup/squirrel';
import { ActivatedRoute } from '@angular/router';
import { detailActions } from '../../reducers/book-detail.reducer';
import { booksActions } from '../../reducers/books.reducer';
import { Book } from '../../shared/models/book.model';
import { BookStatus } from '../../shared/models/book-status.enum';
import { DiaryComment } from '../../shared/models/comment.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, AfterViewChecked, OnDestroy {

  book: GRBook;
  bookInfo: Book;
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
  insertLoading: boolean = false;
  id: number;
  BookStatus = BookStatus;

  comment: DiaryComment = {
    id: 1,
    text: '',
    date: 'sadasdasd',
    userName: 'pnik'
  }

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.dispatcher = new ComponentDispatcher(store, this);
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.dispatcher.dispatch(detailActions.API_GET, this.id);
        this.dispatcher.dispatch(booksActions.ADDITIONAL.GET_SINGLE, this.id);
      }
    });
    let {dataStream: booksData, errorStream: booksError} = squirrel(store, 'books', this);
    let {dataStream: detailData, errorStream: detailError} = squirrel(store, 'detail', this);
    this.subscriptions.push(
      detailData.subscribe(
        (data: SquirrelData<GRBook>) => {
          if (!data.data.length) {
            return;
          }
          this.book = Object.assign({}, data.data[0]);
          let div = document.createElement('div');
          div.innerHTML = this.book.description;
          this.book.description = div.textContent || div.innerText || '';
        }
      )
    );
    this.subscriptions.push(
      detailError.subscribe(
        (error: Error) => {
          console.error(error);
          this.loading = false;
        }
      )
    );

    this.subscriptions.push(
      booksData.subscribe(
        (data: SquirrelData<Book>) => {
          console.log('book data', data.data);
          if (data.data.length) {
            this.bookInfo = data.data[0];
          }
          this.insertLoading = data.loading;
        })
    );
    this.subscriptions.push(
      booksError.subscribe(
        (error: Error) => {
          console.error(error);
          this.insertLoading = false;
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

  addBook(){
    this.dispatcher.dispatch(booksActions.API_CREATE, this.id);
  }

  removeBook(){
    this.dispatcher.dispatch(booksActions.API_DELETE, this.id);
  }

  changeStatus(event) {
    this.bookInfo.status = event.value;
    this.dispatcher.dispatch(booksActions.API_UPDATE, this.bookInfo);
  }

}
