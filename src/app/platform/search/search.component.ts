import { Component, OnInit } from '@angular/core';
import { GoogleResource } from '../../shared/resources/googleBooks';
import { createBook } from '../../shared/models/googleBook.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private googleBooks: GoogleResource) {
  }

  ngOnInit() {
  }

  // searchByAuthor(){
  //   this.googleBooks.getBooksByAuthor('Broučci').subscribe(
  //     (data) =>{
  //       let books = data.json();
  //       if(books.items){
  //         this.books = books.items.map(book => createBook(book));
  //         console.log('books', this.books);
  //       } else {
  //         console.error('no books');
  //       }
  //     },
  //     (err) => {
  //       console.log('error occured', err);
  //     }
  //   )
  // }

}
