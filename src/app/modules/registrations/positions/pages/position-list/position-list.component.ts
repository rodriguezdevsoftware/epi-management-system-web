import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PositionService } from '../../../../../core/services';
import { Position } from '../../../../../core/models';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit {
  positions: Position[] = [];
  loading = false;
  error = '';
  displayedColumns: string[] = ['code', 'description', 'actions'];
  userName = '';
  userEmail = '';

  constructor(
    private positionService: PositionService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.checkCompanySelected();
    this.loadPositions();
  }

  loadUserInfo(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name;
      this.userEmail = user.email;
    }
  }

  checkCompanySelected(): void {
    const currentCompany = this.authService.getCurrentCompany();
    if (!currentCompany) {
      this.error = 'Selecione uma empresa no menu superior para visualizar os cargos';
      this.loading = false;
    }
  }

  loadPositions(): void {
    const currentCompany = this.authService.getCurrentCompany();
    if (!currentCompany) {
      return;
    }

    this.loading = true;
    this.error = '';
    
    const companyId = currentCompany._id;
    
    this.positionService.getAll(companyId).subscribe({
      next: (response) => {
        this.positions = response.positions;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  onNew(): void {
    this.router.navigate(['/registrations/positions/new']);
  }

  onEdit(position: Position): void {
    this.router.navigate(['/registrations/positions/edit', position._id]);
  }

  onDelete(position: Position): void {
    if (confirm(`Deseja realmente excluir o cargo "${position.description}"?`)) {
      this.loading = true;
      this.positionService.delete(position._id!).subscribe({
        next: () => {
          this.loadPositions();
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        }
      });
    }
  }
}
