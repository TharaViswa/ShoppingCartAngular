import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'app/core/components/home/home.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
    ])
  ],
  declarations: [
    LoginComponent,
    BsNavbarComponent,
    HomeComponent
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
