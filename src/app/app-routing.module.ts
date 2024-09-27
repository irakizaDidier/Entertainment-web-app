import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.component';
import { SignupPage } from './pages/signup/signup.component';
import { HomePage } from './pages/home/home.component';
import { SeriesComponent } from './components/series/series.component';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'movies', component: MoviesComponent },
  { path: 'series', component: SeriesComponent },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'signup',
    component: SignupPage,
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
