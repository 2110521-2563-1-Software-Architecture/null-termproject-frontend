import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamplePage1Component } from './example-page1/example-page1.component';
import { ExamplePage2Component } from './example-page2/example-page2.component';
import { NavbarComponent } from './navbar/navbar.component'
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AntdModule } from "./antd.module";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ExamplePage1Component,
    ExamplePage2Component,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardPageComponent
  ],
  imports: [
    AntdModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
