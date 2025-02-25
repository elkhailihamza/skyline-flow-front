import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { authInterceptor } from './auth/auth.interceptor';
import { CommonModule } from '@angular/common';
import { httpInterceptor } from './http.interceptor';
import { AuthComponent } from './auth/auth.component';

export const fetchToken = () => {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: fetchToken,
      }
    }),
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, httpInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
