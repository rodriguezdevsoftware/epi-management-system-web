import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  @Input() userName: string = 'Luciano Rodriguez';
  @Input() userEmail: string = 'luciano@example.com';
}
