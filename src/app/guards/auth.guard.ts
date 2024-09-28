import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly AUTH_KEY = 'isAuthenticated';

  constructor(private router: Router) {}

  login() {
    localStorage.setItem(this.AUTH_KEY, 'true');
  }

  logout() {
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['/login']);
  }

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem(this.AUTH_KEY) === 'true';
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
