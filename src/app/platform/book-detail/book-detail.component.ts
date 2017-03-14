import { Component, AfterViewChecked, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../shared/models/store-model';
import { Store } from '@ngrx/store';
import { GRBook, GRSimilarBook } from '../../shared/models/goodreadsBook.model';
import * as Tether from 'tether';
import { ComponentDispatcher, squirrel, SquirrelData, foxy, SquirrelState } from '@flowup/squirrel';
import { ActivatedRoute } from '@angular/router';
import { detailActions } from '../../reducers/book-detail.reducer';
import { booksActions } from '../../reducers/books.reducer';
import { Book } from '../../shared/models/book.model';
import { BookStatus } from '../../shared/models/book-status.enum';
import { DiaryComment } from '../../shared/models/comment.model';
import { User } from '../../shared/models/user.model';
import { commentActions } from '../../reducers/comments.reducer';

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
  comments: DiaryComment[] = [];
  userComment: DiaryComment;
  user: User;
  newComment = false;
  similarBooks: Book[] = [];

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.dispatcher = new ComponentDispatcher(store, this);
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.dispatcher.dispatch(detailActions.API_GET, this.id);
        this.dispatcher.dispatch(booksActions.ADDITIONAL.GET_SINGLE, this.id);
        if (this.user) {
          this.dispatcher.dispatch(commentActions.API_GET, this.id);
        }
      }
    });
    let {dataStream: booksData, errorStream: booksError} = squirrel(store, 'books', this);
    let {dataStream: detailData, errorStream: detailError} = squirrel(store, 'detail', this);
    let {dataStream: commentsData, errorStream: commentsError} = squirrel(store, 'comments', this);
    let {dataStream: userData, errorStream: userError} = squirrel(store, 'auth', this);
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
          console.log('data', data.data[0].similarBooks);
          this.similarBooks = data.data[0].similarBooks.map(book => this.getSimilarBook(book));
          console.log('similar', this.similarBooks);
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

    this.subscriptions.push(
      commentsData.subscribe(
        (data: SquirrelData<DiaryComment>) => {
          console.log('comments data', data.data);
          if (this.user) {
            this.comments = data.data;
            this.userComment = this.comments.find(comment => comment.userId === this.user.id);
            console.log('user comment', this.userComment);
            if (!this.userComment) {
              this.userComment = {
                date: 'date',
                userName: this.user.userName,
                text: '',
                bookId: this.id,
                userId: this.user.id
              };
              this.newComment = true;
            } else {
              this.newComment = false;
            }
          }
        })
    );
    this.subscriptions.push(
      commentsError.subscribe(
        (error: Error) => {
          console.error(error);
        }
      )
    );

    this.subscriptions.push(
      userData.subscribe(
        (data: SquirrelData<User>) => {
          console.log('user data', data.data);
          if (data.data.length) {
            this.user = data.data[0];
            this.dispatcher.dispatch(commentActions.API_GET, this.id);
          }
        })
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

  addBook() {
    this.dispatcher.dispatch(booksActions.API_CREATE, this.id);
  }

  removeBook() {
    this.dispatcher.dispatch(booksActions.API_DELETE, this.id);
  }

  changeStatus(event) {
    this.bookInfo.status = event.value;
    this.dispatcher.dispatch(booksActions.API_UPDATE, this.bookInfo);
  }

  editComment(item: any) {
    this.dispatcher.dispatch(commentActions.API_UPDATE, item);
  }

  addComment(item: any) {
    this.dispatcher.dispatch(commentActions.API_CREATE, item);
  }

  deleteComment(item: any) {
    this.dispatcher.dispatch(commentActions.API_DELETE, item);
  }

  getSimilarBook(book: GRSimilarBook): Book {
    let newBook = {};
    newBook['title'] = book.title;
    newBook['author'] = book.authors[0].name;
    newBook['imageUrl'] = book.imageUrl;
    newBook['id'] = +book.id;
    return <Book>newBook;
  }
}
