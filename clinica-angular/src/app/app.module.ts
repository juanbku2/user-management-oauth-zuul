import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { FooComponent } from './foo.component';
import { UserInformationComponent} from './user.information.component';
import { CookieService } from 'ngx-cookie-service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablaBootstrapComponent } from './tabla.bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FooComponent,
    UserInformationComponent,
    TablaBootstrapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: '', component: FooComponent},
      {path: 'userinformation', component: UserInformationComponent},
      {path: 'tabla', component: TablaBootstrapComponent},
    ]),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
