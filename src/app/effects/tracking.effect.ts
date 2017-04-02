import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { trackingActions } from '../reducers/tracking.reducer';
import { createOptions } from '../shared/createOptions';
import { environment } from '../../environments/environment.prod';
import { Action } from '@ngrx/store';
const API_ENDPOINT = '/tracking';

@Injectable()
export class TrackingEffect {

  constructor(private actions: Actions, private http: Http) {

  }

  @Effect() getTracking: Observable<Action> = this.actions
    .ofType(trackingActions.API_GET)
    .switchMap((action) => this.http.get(environment.apiUrl + API_ENDPOINT + '/book/' + action.payload.body, createOptions())
      .map(body => ({type: trackingActions.GET, payload: {origin: action.payload.origin, body: [body.json()]}}))
      .catch(body => Observable.of({type: trackingActions.API_GET_FAIL, payload: {origin: action.payload.origin, body: body.json()}})));

  @Effect() getLastTracking: Observable<Action> = this.actions
    .ofType(trackingActions.ADDITIONAL.GET_LAST)
    .switchMap((action) => this.http.get(environment.apiUrl + API_ENDPOINT, createOptions())
      .map(body => ({type: trackingActions.GET, payload: {origin: action.payload.origin, body: [body.json()]}}))
      .catch(body => Observable.of({type: trackingActions.API_GET_FAIL, payload: {origin: action.payload.origin, body: body.json()}})));

  @Effect() startTracking: Observable<Action> = this.actions
    .ofType(trackingActions.ADDITIONAL.START)
    .switchMap((action) => this.http.put(environment.apiUrl + API_ENDPOINT + '/start/' + action.payload.body, {}, createOptions())
      .map(body => ({type: trackingActions.GET, payload: {origin: action.payload.origin, body: [body.json()]}}))
      .catch(body => Observable.of({type: trackingActions.API_GET_FAIL, payload: {origin: action.payload.origin, body: body.json()}})));

  @Effect() stopTracking: Observable<Action> = this.actions
    .ofType(trackingActions.ADDITIONAL.END)
    .switchMap((action) => this.http.put(environment.apiUrl + API_ENDPOINT + '/stop/' + action.payload.body, {}, createOptions())
      .map(body => ({type: trackingActions.GET, payload: {origin: action.payload.origin, body: [body.json()]}}))
      .catch(body => Observable.of({type: trackingActions.API_GET_FAIL, payload: {origin: action.payload.origin, body: body.json()}})));
}