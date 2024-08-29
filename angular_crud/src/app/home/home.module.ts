import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NavbarComponent
],
  exports: [LoginComponent]
})
export class HomeModule { }
