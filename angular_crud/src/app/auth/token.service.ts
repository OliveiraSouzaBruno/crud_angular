import { Injectable } from '@angular/core';

const ACESS_TOKEN = "acess_token";
const REFRESH_TOKEN = "refresh_token";
const USERNAME = "username";
const ROLE = "role";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(ACESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  saveToken(token: string): void {
    localStorage.setItem(ACESS_TOKEN, token);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    localStorage.removeItem(ACESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN);
  }

  removeAllTokens(): void {
    localStorage.removeItem(ROLE);
    localStorage.removeItem(USERNAME);
    localStorage.removeItem(ACESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

}
