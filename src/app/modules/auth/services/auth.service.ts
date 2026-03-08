import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(email: string, password: string): boolean {
    // TODO: Implementar chamada à API de autenticação
    // Por enquanto, simular login bem-sucedido
    
    // Salvar token no localStorage (simulado)
    const mockToken = 'mock-jwt-token-' + btoa(email);
    localStorage.setItem('token', mockToken);
    localStorage.setItem('userEmail', email);
    
    // Redirecionar para home
    this.router.navigate(['/home']);
    return true;
  }

  logout(): void {
    console.log('AuthService.logout() called');
    // Limpar dados de autenticação
    localStorage.clear();
    sessionStorage.clear();
    console.log('Storage cleared, navigating to login');
    
    // Redirecionar para a tela de login
    this.router.navigate(['/login']).then(() => {
      console.log('Navigation to /login completed');
    });
  }

  isAuthenticated(): boolean {
    // Implementar lógica de verificação de autenticação
    // Por exemplo, verificar se existe token no localStorage
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }
}
