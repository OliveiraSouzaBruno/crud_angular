import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';


const API_URL = environment.api;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private localStorage: StorageService,
    private router: Router,
    private toastService: ToastrService
  ) {
    if(this.localStorage.getRole() !== null) this.loggedIn.next(true);
   }

  login(dadosLogin: any): Observable<any> {
    this.tokenService.removeAllTokens();

      return this.http.post<any>(API_URL + 'user/auth', {}, { headers: {
        ...dadosLogin,
      } })
       .pipe(tap(res => {
          this.tokenService.saveToken(res.token);
          const tokenPayLoad = this.getDecodedAcessToken(res.token)
          this.localStorage.setExp(tokenPayLoad.exp)
          this.localStorage.setRole(tokenPayLoad.role);
          this.localStorage.setUsername(tokenPayLoad.sub);
          if(this.router.url == "/login") {
            this.router.navigate(['home']).then()
          }
          this.loggedIn.next(true);
        },
        err => {
          //console.log(err)
          this.toastService.warning(err.error.message)
        }),
      );
  }

  getDecodedAcessToken(acess_token: string): any {
    return jwt_decode(acess_token)
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    this.tokenService.removeAllTokens();
    this.toastService.success("Desconectado com sucesso");
    this.router.navigate(['pages/login']).then();
    this.loggedIn.next(false);

  }
}

