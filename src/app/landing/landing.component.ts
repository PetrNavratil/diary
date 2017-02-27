import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {


  register(form) {
    console.log('register form', form.value);
  }

  login(form) {
    console.log('login form', form.value);
  }
}


interface Register {
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
}
