import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PositionService } from '../../../../../core/services';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit {
  positionForm!: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  positionId: string | null = null;
  pageTitle = 'Novo Cargo';
  userName = '';
  userEmail = '';

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.initForm();
    this.checkEditMode();
  }

  loadUserInfo(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name;
      this.userEmail = user.email;
    }
  }

  initForm(): void {
    this.positionForm = this.fb.group({
      code: [''],
      description: ['', Validators.required]
    });
  }

  checkEditMode(): void {
    this.positionId = this.route.snapshot.paramMap.get('id');
    if (this.positionId) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Cargo';
      this.loadPosition(this.positionId);
    }
  }

  loadPosition(id: string): void {
    this.loading = true;
    this.positionService.getById(id).subscribe({
      next: (response) => {
        this.positionForm.patchValue({
          code: response.position.code,
          description: response.position.description
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.positionForm.invalid) {
      this.positionForm.markAllAsTouched();
      return;
    }

    const currentCompany = this.authService.getCurrentCompany();
    if (!currentCompany || !currentCompany._id) {
      this.error = 'Nenhuma empresa selecionada';
      return;
    }

    this.loading = true;
    this.error = '';

    const payload = {
      ...this.positionForm.value,
      companyId: currentCompany._id
    };

    const operation = this.isEditMode 
      ? this.positionService.update(this.positionId!, payload)
      : this.positionService.create(payload);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/registrations/positions']);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/registrations/positions']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.positionForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    return '';
  }
}
