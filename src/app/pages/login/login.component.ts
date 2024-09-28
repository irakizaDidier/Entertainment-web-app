import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../stores/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPage implements OnInit {
  loading: boolean = false;
  showError: boolean = false;
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router, private store: Store) {}

  navigateToSignupRoute() {
    this.router.navigate(['/signup']);
  }

  ngOnInit(): void {}

  togglePasswordVisibility(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;

    if (field) {
      field.type = this.passwordVisible ? 'password' : 'text';
      this.passwordVisible = !this.passwordVisible;
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      this.loading = true;
      this.store.dispatch(login({ email, password }));


      setTimeout(() => {
        this.router.navigate(['/home']);
        this.loading = false;
      }, 1000);
    }
    return false;
  }
}
