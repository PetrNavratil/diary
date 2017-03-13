import { Component, OnInit } from '@angular/core';
import { ComponentDispatcher, squirrel, SquirrelData } from '@flowup/squirrel';
import { AppState } from '../../shared/models/store-model';
import { Store } from '@ngrx/store';
import { Book } from '../../shared/models/book.model';
import { booksActions } from '../../reducers/books.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {

  dispatcher: ComponentDispatcher;
  subscriptions: any[] = [];
  books: Book[] = [];

  constructor(private store: Store<AppState>, private router: Router) {
    this.dispatcher = new ComponentDispatcher(store, this);
    this.dispatcher.dispatch(booksActions.API_GET);
    let {dataStream, errorStream} = squirrel(store, 'books', this);
    this.subscriptions.push(
      dataStream.subscribe(
        (data: SquirrelData<Book>) => {
          this.books = data.data;
        }
      )
    );
  }

  ngOnInit() {
  }

  goToDetail(id: number): void {
    this.router.navigate([`platform/detail/${id}`]);
  }

}
