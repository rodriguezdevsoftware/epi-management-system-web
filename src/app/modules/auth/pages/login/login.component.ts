import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password);
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
