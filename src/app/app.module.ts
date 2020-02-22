import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_services/auth.interceptor';
import { SigninComponent } from './_components/signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LandingComponent } from './_components/landing/landing.component';
import { UserComponent } from './_components/user/user.component';
import { HeaderComponent } from './_components/header/header.component';
import { CompanyComponent } from './_components/company/company.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LandingComponent,
    UserComponent,
    HeaderComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
