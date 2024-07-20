import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacancyComponent } from '../vacancy/vacancy.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IntroductoryComponent } from '../introductory/introductory.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent,
    VacancyComponent,
    IntroductoryComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  isRegistering = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    // const currentUser = this.authService.currentUserValue;
    // if (currentUser) {
    //   this.router.navigate(['/home']);
    // }

    const isLoggedIn = this.authService.loggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  toggleRegister(isRegistering: boolean) {
    this.isRegistering = isRegistering;
  }
}
