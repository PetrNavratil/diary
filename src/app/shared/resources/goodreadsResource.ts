import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { GoodReadsBook } from '../models/goodreadsBook.model';
import { Injectable } from '@angular/core';

const KEY = 'tsRkj9chcP8omCKBCJLg0A'

@Injectable()
export class GoodreadsResource {

  constructor(private http: Http) {

  }

  sendRequest() {
    let headers = new Headers();
    //headers.append('Access-Control-Allow-Origin', '*');

    this.http.get('https://www.goodreads.com/search/index.xml?key=' + KEY + '&q=harry+potter+a+ohniv', {headers: headers}).subscribe(
      (resp) => {
        console.log('response', resp);
      }
    )
  }

}
