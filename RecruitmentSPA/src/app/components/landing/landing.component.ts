import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacancyComponent } from '../vacancy/vacancy.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatToolbarModule,
    LoginComponent,
    RegisterComponent,
    VacancyComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  isRegistering = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const isLoggedIn = this.authService.loggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  toggleRegister(isRegistering: boolean) {
    this.isRegistering = isRegistering;
  }
}
