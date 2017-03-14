import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  menuItems: any[] = [
    {
      name: 'My books',
      link: 'books'
    },
    {
      name: 'Improved search',
      link: 'search'
    },
    {
      name: 'Book detail',
      link: 'detail'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

}
