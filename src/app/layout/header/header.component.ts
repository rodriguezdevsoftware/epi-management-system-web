import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() userName: string = 'Usuário';
  @Input() userEmail: string = 'usuario@example.com';

  onLogout() {
    // Implementar lógica de logout
    console.log('Logout clicked');
  }

  onProfile() {
    // Implementar navegação para perfil
    console.log('Profile clicked');
  }
}
