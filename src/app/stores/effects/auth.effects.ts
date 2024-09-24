import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  signup,
  signupSuccess,
  signupFailure,
  login,
  loginSuccess,
  loginFailure,
} from '../actions/auth.actions';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  private signupUrl = 'auth/signup';
  private loginUrl = '/auth/login';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      mergeMap(({ email, password, confirmpassword }) =>
        this.http
          .post(
            this.signupUrl,
            { email, password, confirmpassword },
            { withCredentials: true }
          )
          .pipe(
            map((response: any) => signupSuccess({ response })),
            catchError((error) => of(signupFailure({ error })))
          )
      )
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupSuccess),
        tap(() => {
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  signupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupFailure),
        tap(({ error }) => {
          console.error('Signup failed:', error);
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) =>
        this.http
          .post(this.loginUrl, { email, password }, { withCredentials: true })
          .pipe(
            map((response: any) => loginSuccess({ response })),
            catchError((error) => of(loginFailure({ error })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap(({ error }) => {
          console.error('Login failed:', error);
        })
      ),
    { dispatch: false }
  );
}
