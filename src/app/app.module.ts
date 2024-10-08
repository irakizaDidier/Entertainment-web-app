import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SignupPage } from './pages/signup/signup.component';
import { LoginPage } from './pages/login/login.component';
import { HomePage } from './pages/home/home.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { movieReducer } from './stores/reducers/movie.reducers';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { InputComponent } from './components/input/input.component';
import { BookmarkButtonComponent } from './components/bookmark-button/bookmark-button.component';
import { MovieEffects } from './stores/effects/movie.effects';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { BookmarkedComponent } from './components/bookmarked/bookmarked.component';
import { HomeComponent } from './components/home/home.component';
import { TrendingComponent } from './components/trending/trending.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupPage,
    LoginPage,
    HomePage,
    ButtonComponent,
    HeaderComponent,
    LogoutButtonComponent,
    MovieInfoComponent,
    MoviesComponent,
    SeriesComponent,
    InputComponent,
    BookmarkButtonComponent,
    RecommendedComponent,
    BookmarkedComponent,
    HomeComponent,
    TrendingComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ movie: movieReducer }),
    EffectsModule.forRoot([MovieEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
