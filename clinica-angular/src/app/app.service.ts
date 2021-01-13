import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';





export class Foo {
  constructor(
    public id: string,
    public name: string) { }
}

export class UserInformation {
  constructor(
    public data: any[],
    public elements: [],
    public _links: {nextPage; previousPage; },
    public previousPage: string,
    public totalElements: number,
    public totalPages: number,
    ) { }
}

export class UserInformationBootstrap {
  constructor(
    public elements: [],
    public _links: {nextPage; previousPage; },
    public previousPage: string,
    public totalElements: number,
    public totalPages: number,
    public currentPage: number,
    public pageSize: number,
    public picByte: any,
    ) { }
}

@Injectable()
export class AppService {
  constructor(
    private _router: Router, private _http: HttpClient, private _cookie: CookieService){}

  obtainAccessToken(loginData){
    let params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'clientId');

    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Basic ' + btoa('clientId:secret')});
    let options = { headers };
    console.log(params.toString());
    this._http.post('http://192.168.0.8:8080/login', params.toString(), options)
      .pipe(
       map(res => res))
      .subscribe(
        data => this.saveToken(data),
        err => alert('Invalid Credentials')
      );
  }


  saveToken(token){
    let now = new Date();
    let expire = new Date(now);
    expire.setSeconds(now.getSeconds() + token.expires_in);
    console.log(expire);
    this._cookie.set('access_token', token.access_token, expire);

    console.log('Obtained Access token');
    this._router.navigate(['/']);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status} \nMessage: ${error.error.error} \n`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getResource(resourceUrl, usersNumber = '5'){

    let options = {
      headers: {'Content-type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + this._cookie.get('access_token')}
      , params: { pageSize: usersNumber} };

    return this._http.get<any>(resourceUrl,  options )
      .pipe(retry(3), catchError(this.handleError));
  }


  checkCredentials() {
    let errorMessage = 'Sesion Expirada';
    if (!this._cookie.check('access_token')){
      window.alert(errorMessage);
      this._router.navigate(['/login']);
   }

  }

  logout() {
    this._cookie.delete('access_token');
    this._router.navigate(['/login']);
  }
}


