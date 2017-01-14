import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Action } from '@ngrx/store';

const API_ENDPOINT = '/books?key=';


@Injectable()
export class SearchEffect {

  constructor(private actions: Actions, private http: Http) {
  }

  @Effect() search: Observable<Action> = this.actions
    .ofType('GET_SEARCH')
    .switchMap((action) => this.http.get(environment.apiUrl + API_ENDPOINT + encodeURI(action.payload))
      .map(response => ({type: 'GET_SEARCH_SUCCESSFUL', payload: response.json()}))
      .catch(err => Observable.of({type: 'GET_SEARCH_FAILURE', payload: err})));
}