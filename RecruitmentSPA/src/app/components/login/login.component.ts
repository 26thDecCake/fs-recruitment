import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginDTO } from '../../models/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() switchToRegister = new EventEmitter<boolean>();

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginDTO = this.loginForm.value;
      console.log(loginData);

      this.authService
        .login(loginData)
        .pipe(
          tap(() => {
            this.successMessage = 'Login successful!';
            this.router.navigate(['/home']);
          }),
          catchError((error) => {
            console.error('Error fetching vacancies:', error);
            this.errorMessage = 'Invalid login credentials';
            return of(null);
          })
        )
        .subscribe();

      // this.authService.login(loginData).subscribe(
      //   () => this.router.navigate(['/home']),
      //   () => (this.errorMessage = 'Invalid login credentials')
      // );
    }
  }

  switch() {
    console.log('switch');

    this.switchToRegister.emit(true);
  }
}
