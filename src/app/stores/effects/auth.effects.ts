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
  logout,
  logoutSuccess,
  logoutFailure,
  checkToken,
} from '../actions/auth.actions';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  private signupUrl = 'auth/signup';
  private loginUrl = 'auth/login';
  private logoutUrl = 'auth/logout';
  private checkTokenUrl = 'auth/checktoken';

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

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        this.http.post(this.logoutUrl, {}, { withCredentials: true }).pipe(
          map(() => logoutSuccess()),
          catchError((error) => of(logoutFailure({ error })))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  logoutFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutFailure),
        tap(({ error }) => {
          console.error('Logout failed:', error);
        })
      ),
    { dispatch: false }
  );

  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkToken),
      mergeMap(() =>
        this.http.get(this.checkTokenUrl, { withCredentials: true }).pipe(
          map((response: any) => {
            return loginSuccess({ response });
          }),
          catchError((error) => {
            this.router.navigate(['/login']);
            return of(loginFailure({ error }));
          })
        )
      )
    )
  );
}
