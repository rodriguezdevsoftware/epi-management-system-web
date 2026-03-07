import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Lógica de login aqui
      console.log(this.loginForm.value);

      this.router.navigate(['/home']);
    }
  }

  onForgotPassword() {
    // Navegar para página de recuperação de senha
    console.log('Navegar para recuperação de senha');
    // this.router.navigate(['/auth/forgot-password']);
  }

  onRegister() {
    // Navegar para página de registro
    console.log('Navegar para página de registro');
    // this.router.navigate(['/auth/register']);
  }
}
