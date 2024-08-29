import { Injectable } from '@angular/core';

 const USERNAME = "username";
 const ROLE = "role";
 const EXP = "expiration";
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setExp(exp: string): void {
    localStorage.setItem(EXP, exp);
  }

  getExp(): string | null {
    return localStorage.getItem(EXP);
  }

  setUsername(username: any): void {
    localStorage.setItem(USERNAME, username);
  }

  getUsername(): any {
    return localStorage.getItem(USERNAME);
  }

  removeUsername(): void {
    localStorage.removeItem(USERNAME);
  }

  setRole(role: string): void {
    localStorage.setItem(ROLE, role);
  }

  getRole(): any {
    return localStorage.getItem(ROLE);
  }

  removeRole(): void {
    localStorage.removeItem(ROLE);
  }
}
