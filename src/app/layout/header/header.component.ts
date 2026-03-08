import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() userName: string = 'Usuário';
  @Input() userEmail: string = 'usuario@example.com';

  constructor(private router: Router) {
    console.log('HeaderComponent initialized');
  }

  onLogout() {
    console.log('onLogout called - starting logout process');
    
    // Limpar dados
    localStorage.clear();
    sessionStorage.clear();
    console.log('Storage cleared');
    
    // Redirecionar
    console.log('Attempting to navigate to /login');
    this.router.navigate(['/login']).then(
      (success) => console.log('Navigation success:', success),
      (error) => console.error('Navigation error:', error)
    );
  }

  onProfile() {
    // Implementar navegação para perfil
    console.log('Profile clicked');
  }
}
