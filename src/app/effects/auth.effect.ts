import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { authActions } from '../reducers/auth.reducer';
import { createOptions } from '../shared/createOptions';

const LOGIN_ENDPOINT = '/login';
const REGISTER_ENDPOINT = '/register';
const USER_ENDPOINT = '/user';


@Injectable()
export class AuthEffect {

  options: RequestOptionsArgs;

  constructor(private actions: Actions, private http: Http) {
    this.options = createOptions();
  }

  @Effect() login: Observable<Action> = this.actions
    .ofType((<any>authActions.ADDITIONAL).LOGIN)
    .switchMap((action) => this.http.post(environment.apiUrl + LOGIN_ENDPOINT, action.payload.body)
      .flatMap(res => {
        res = res.json();
        localStorage.setItem('id_token', (<any>res).token);
        this.options = createOptions();
        return this.http.get(environment.apiUrl + USER_ENDPOINT, this.options);
      })
      .map(body => ({
        type: authActions.GET,
        payload: {body: [body.json()], origin: action.payload.origin}
      }))
      .catch(body => Observable.of({
        type: authActions.API_GET_FAIL,
        payload: {origin: action.payload.origin, body: body.json().message}
      })));

  @Effect() register: Observable<Action> = this.actions
    .ofType((<any>authActions.ADDITIONAL).REGISTER)
    .switchMap((action) => this.http.post(environment.apiUrl + REGISTER_ENDPOINT, action.payload.body)
      .flatMap(res => {
        res = res.json();
        localStorage.setItem('id_token', (<any>res).token);
        this.options = createOptions();
        return this.http.get(environment.apiUrl + USER_ENDPOINT, this.options);
      })
      .map(body => ({
        type: authActions.GET,
        payload: {body: [body.json()], origin: action.payload.origin}
      }))
      .catch(body => Observable.of({
        type: authActions.API_GET_FAIL,
        payload: {origin: action.payload.origin, body: body.json().message}
      })));

  @Effect() auth = this.actions.ofType((<any>authActions.ADDITIONAL).AUTH)
    .switchMap(action => this.http.get(environment.apiUrl + USER_ENDPOINT, this.options)
      .map(body => ({type: authActions.GET, payload: {origin: action.payload.origin, body: [body.json()]}}))
      .catch(body => Observable.of({
        type: authActions.API_GET_FAIL,
        payload: {origin: action.payload.origin, body: body.json().message}
      })));

}