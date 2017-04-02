import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject } from 'rxjs';
import { Tracking } from '../shared/models/tracking.model';

@Injectable()
export class TrackingService {
  constructor(private http: Http) {

  }

  lastTracking: ReplaySubject<Tracking>;
}