import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../shared/material/material.module';
import { PositionsRoutingModule } from './positions-routing.module';
import { PositionListComponent } from './pages/position-list/position-list.component';
import { PositionFormComponent } from './pages/position-form/position-form.component';
import { LayoutModule } from '../../../layout/layout.module';


@NgModule({
  declarations: [
    PositionListComponent,
    PositionFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    PositionsRoutingModule
  ]
})
export class PositionsModule { }
