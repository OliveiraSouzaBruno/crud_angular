import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private toastService: ToastrService,
        private authService: AuthService
        //private loadingService: LoadingS
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        const token = this.tokenService.getToken();
        if (token && this.authService.isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //this.loadingService.hide();
                    //console.log('event--->', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // this.loadingService.hide();
                console.log(error.error)
                this.toastService.warning(error.error.message)
                if (error.error.statusCode === 401 || error.error.error_description.includes("Token de requisição expirado.")) {//"Token de requisição expirado."
                    this.tokenService.removeAllTokens();
                    //this.storageService.clear()
                    this.router.navigate(['login']).then(_ => console.log('Redirecionado para pagina de login'))
                }
                else if (error.error.error === "invalid_grant") {
                    this.tokenService.removeAllTokens();
                    //this.storageService.clear()
                    //console.error("senha ou username inválido");
                    this.router.navigate(['login']).then(_ => console.log('Redirecionado para pagina de login'))

                }
                else if (error.error.error === 'access_denied') {
                    //console.log("Acesso não permitido")
                    this.tokenService.removeAllTokens();
                    //this.storageService.clear()
                    this.router.navigate(['login']).then(_ => console.log('Redirecionado para pagina de login'))
                }
                else if (error.message.includes('Http failure response')) {
                    // console.log(error.message)
                    if (error.message.includes('Http failure response')) {

                    }
                }
                else {

                }

                return throwError(() => {
                    error
                    //console.log(error)
                });
            },

            )
        )
    }
}
