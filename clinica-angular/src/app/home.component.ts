import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'home-header',
  providers: [AppService],
  template: `<div class="container" >
    <div class="content">
        <span>Welcome !!</span>
        <a class="btn btn-default pull-right"(click)="logout()" href="#">Logout</a>
    </div>
    <tabla-details></tabla-details>
</div>`
})

export class HomeComponent implements OnInit{

  constructor(
    private _service: AppService){}

  ngOnInit() {
    this._service.checkCredentials();
  }

  logout() {
    this._service.logout();
  }
}
