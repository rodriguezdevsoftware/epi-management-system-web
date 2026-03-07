import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../core/models/menu.model';
import { MENU_ITEMS } from '../../core/constants/menu.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuItems: MenuItem[] = MENU_ITEMS;

  constructor(private router: Router) {}

  isMenuActive(item: MenuItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => this.router.isActive(child.route, false));
  }
}
