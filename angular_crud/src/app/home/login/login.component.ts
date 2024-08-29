import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  email: string = '';
  password: string = '';

  onSubmit() {
    if (this.email && this.password) {
      // Lógica para autenticação
      console.log('Email:', this.email);
      console.log('Senha:', this.password);
    }
  }

}
