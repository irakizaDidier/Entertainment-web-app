import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { signup } from '../../stores/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupPage implements OnInit {
  loading: boolean = false;
  showError: boolean = false;
  errorText: string = '';
  email: string = '';
  password: string = '';
  confirmpassword: string = '';
  passwordVisible: boolean = false;
  confirmpasswordVisible: boolean = false;

  constructor(private router: Router, private store: Store) {}

  navigateToLoginRoute() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}

  togglePasswordVisibility(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;

    if (field) {
      field.type = this.passwordVisible ? 'password' : 'text';
      this.passwordVisible = !this.passwordVisible;
    }
  }

  toggleConfirmPasswordVisibility(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;

    if (field) {
      field.type = this.confirmpasswordVisible ? 'password' : 'text';
      this.confirmpasswordVisible = !this.confirmpasswordVisible;
    }
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const confirmpassword = form.value.confirmpassword;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (form.valid && password === confirmpassword && emailRegex.test(email)) {
      this.loading = true;
      this.store.dispatch(signup({ email, password, confirmpassword }));
    } else if (!emailRegex.test(email)) {
      this.showError = true;
      this.errorText = 'Email is not in a valid format';
    } else {
      this.showError = true;
      this.errorText = 'Password does not match';
    }

    return false;
  }
}
