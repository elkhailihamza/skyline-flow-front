import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import { CommonModule } from '@angular/common';
import { httpInterceptor } from './http.interceptor';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { LayoutModule } from './layout/layout.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './state/effects/auth.effect';
import { ImageHandlerModule } from './image-handler/image-handler.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    StoreModule.forRoot({ auth: authReducer}),
    EffectsModule.forRoot([AuthEffect]),
    ImageHandlerModule
],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, httpInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
