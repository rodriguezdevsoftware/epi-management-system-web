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
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Login bem-sucedido, navegação é gerenciada pelo service
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao fazer login. Tente novamente.';
          console.error('Erro no login:', error);
        }
      });
    } else {
      // Marcar todos os campos como "touched" para mostrar erros de validação
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
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
