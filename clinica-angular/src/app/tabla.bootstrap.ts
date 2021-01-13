import {Component,  OnInit, } from '@angular/core';
import {AppService,  UserInformationBootstrap} from './app.service';



@Component({
  selector: 'tabla-details',
  providers: [AppService],
  styles: ['table { width: 100%;}'],
  template: `

    <div class="container">
      <h2>Basic Table</h2>
      <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>
      <table class="table">
        <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Imagen</th>
        </tr>
        </thead>
        <tbody *ngFor="let user of users">
        <tr>
          <td>{{user.username}}</td>
          <td>{{user.email}}</td>
          <td>{{user._links.Self.href}}</td>
          <td>
            <img *ngIf="user.picByte; else elseBlock" [src]="'data:image/jpeg;base64,'+user.picByte">
            <ng-template #elseBlock>User has no image.</ng-template>
          </td>
        </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <input class="form-control" type="text"  [(ngModel)]="pageSize"/>
        <button class="btn btn-primary pull-right" (click)="setPageSize()" type="submit">Login</button>
        <ul class="pagination">
          <li class="page-item">
            <button type="button" class="btn btn-link"  (click)="hasPrevious()" [disabled]="disableHasPrevious">Previous</button>
          </li>
         <li class="page-item">
           <button type="button" class="btn btn-link">{{currentPage + 1}}/{{totalPages}}</button>
         </li>
          <li class="page-item">
            <button role="button" class="btn btn-link" (click)="hasNext()"  [disabled]="disableHasNext" > Next</button>
          </li>
        </ul>
      </nav>
    </div>
    `
})

export class TablaBootstrapComponent implements  OnInit{
  constructor(private _service: AppService) {}

  public foosUrl = 'http://192.168.0.8:8080/users';

  users: [];

  nextPage: string;
  previousPage: string;
  totalElements: number;
  disableHasPrevious: boolean;
  disableHasNext: boolean;
  totalPages: number;
  currentPage: number;
  public pageSize: string;


  ngOnInit() {
    this._service.checkCredentials();
    this.getFoo();
  }

  hasNext() {
    this.foosUrl = this.nextPage;
    this.getFoo();
  }


  hasPrevious() {
    this.foosUrl = this.previousPage;
    this.getFoo();
  }

  setPageSize(){
    this.foosUrl = 'http://192.168.0.8:8080/users';
    this.getFoo();
  }

  getFoo(){
    this._service.getResource(this.foosUrl, this.pageSize )
      .subscribe((data: UserInformationBootstrap) => {

          console.log(data);
          this.users = data.elements;

          if ( data._links.nextPage !== undefined ) {
            this.disableHasNext = false;
            this.nextPage = data._links.nextPage.href;
          }  else {
            this.disableHasNext = true;
          }

          if ( data._links.previousPage !== undefined) {
            this.disableHasPrevious = false;
            this.previousPage = data._links.previousPage.href;
          } else {
            this.disableHasPrevious = true;
          }
          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
          this.currentPage = data.currentPage;


        }
        ,
        error =>  'Error');
  }

}
