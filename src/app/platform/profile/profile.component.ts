import { Component, OnDestroy } from '@angular/core';
import { AppState } from '../../shared/models/store-model';
import { Store } from '@ngrx/store';
import { ComponentDispatcher, squirrel, SquirrelData } from '@flowup/squirrel';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {

  dispatcher: ComponentDispatcher;
  user: User;
  subscriptions: any[] = [];

  constructor(private store: Store<AppState>) {
    this.dispatcher = new ComponentDispatcher(store, this);
    let {dataStream, errorStream} = squirrel(store, 'users', this);
    this.subscriptions.push(
      dataStream.subscribe(
        (data: SquirrelData<User>) => {
          if (data.data.length && !data.loading) {
            this.user = data.data[0];
            console.log('user', this.user);
          }
        }
      )
    );
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  editPassword() {

  }

  editUser() {

  }


}
