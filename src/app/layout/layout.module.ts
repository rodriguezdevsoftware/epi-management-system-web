import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material/material.module';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    MainLayoutComponent,
    HeaderComponent,
    NavbarComponent
  ]
})
export class LayoutModule { }
