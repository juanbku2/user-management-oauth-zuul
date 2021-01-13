import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppService,  UserInformation} from './app.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'user-details',
  providers: [AppService],
  styles: ['table { width: 100%;}'],
  template: `

    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="dataSource">

        <!-- Position Column -->
        <ng-container matColumnDef="userId">
          <th mat-header-cell *matHeaderCellDef> No. </th>
          <td mat-cell *matCellDef="let elements"> {{elements.userId}} </td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="username">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let elements"> {{elements.username}} </td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Weight </th>
          <td mat-cell *matCellDef="let elements"> {{elements.email}} </td>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="selfUrl">
          <th mat-header-cell *matHeaderCellDef> Symbol </th>
          <td mat-cell *matCellDef="let elements"> {{elements._links.Self.href}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator [pageSizeOptions]="[5, 10, 15]" showFirstLastButtons></mat-paginator>
    </div>
    `
})

export class UserInformationComponent implements  OnInit{
  constructor(private _service: AppService) {}
  private foosUrl = 'http://192.168.0.8:8081/users';
  displayedColumns: string[] = ['userId', 'username', 'email', 'selfUrl'];



  dataSource: MatTableDataSource<UserInformation>;
  nextPage: string;
  previousPage: string;
  totalElements: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  ngOnInit() {
    this._service.checkCredentials();
    this.getFoo();
  }

  getFoo(){
    this._service.getResource(this.foosUrl)
      .subscribe((data: UserInformation) => {

          console.log(data);
          this.dataSource = new MatTableDataSource<UserInformation>(data.elements);
          this.dataSource.paginator = this.paginator;
          this.nextPage = data._links.nextPage.href;
          this.totalElements = data.totalElements;
        }
        ,
        error =>  'Error');
  }

}
