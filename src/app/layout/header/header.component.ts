import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../core/services/company.service';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Company } from '../../core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() userName: string = 'Usuário';
  @Input() userEmail: string = 'usuario@example.com';
  
  companies: Company[] = [];
  selectedCompany: Company | null = null;
  isLoadingCompanies = true;
  showCompanySelector = false;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private authService: AuthService
  ) {
    console.log('HeaderComponent initialized');
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.isLoadingCompanies = true;
    this.companyService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.companies) {
          this.companies = response.companies;
          
          if (this.companies.length === 1) {
            // Se houver apenas uma empresa, seleciona automaticamente
            this.selectCompany(this.companies[0]);
          } else if (this.companies.length > 1) {
            // Se houver múltiplas empresas, verifica se já tem uma selecionada
            const currentCompany = this.authService.getCurrentCompany();
            if (currentCompany && this.companies.find(c => c._id === currentCompany._id)) {
              this.selectedCompany = currentCompany;
            } else {
              // Se não tem empresa selecionada, mostra o dropdown
              this.showCompanySelector = true;
            }
          }
        }
        this.isLoadingCompanies = false;
      },
      error: (error) => {
        console.error('Erro ao carregar empresas:', error);
        this.isLoadingCompanies = false;
      }
    });
  }

  selectCompany(company: Company): void {
    this.selectedCompany = company;
    this.authService.setCurrentCompany(company);
    this.showCompanySelector = false;
  }

  openCompanySelector(): void {
    if (this.companies.length > 1) {
      this.showCompanySelector = true;
    }
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
