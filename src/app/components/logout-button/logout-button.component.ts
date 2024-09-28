import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../stores/actions/auth.actions';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css'],
})
export class LogoutButtonComponent {
  loading: boolean = false;
  logoutOptionOpen: boolean = false;

  constructor(private router: Router, private store: Store) {}

  handleClickOpenOptions() {
    this.logoutOptionOpen = !this.logoutOptionOpen;
  }

  logoutFn() {
    this.loading = true;
    this.store.dispatch(logout());

    setTimeout(() => {
      localStorage.removeItem('isAuthenticated');
      this.router.navigate(['/login']);
      this.loading = false; 
    }, 1000);
  }
}
