import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Action } from '@ngrx/store';

const API_ENDPOINT = '/book?id=';


@Injectable()
export class BookDetail {

  constructor(private actions: Actions, private http: Http) {
  }

  @Effect() bookDetail: Observable<Action> = this.actions
    .ofType('GET_DETAIL')
    .switchMap((action) => this.http.get(environment.apiUrl + API_ENDPOINT + action.payload)
      .map(response => ({type: 'GET_DETAIL_SUCCESSFUL', payload: response.json()}))
      .catch(err => Observable.of({type: 'GET_DETAIL_FAILURE', payload: err})));
}