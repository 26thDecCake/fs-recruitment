import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterDTO } from '../../models/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Output() switchToLogin = new EventEmitter<boolean>();

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData: RegisterDTO = this.registerForm.value;
      console.log(registerData);

      this.authService
        .register(registerData)
        .pipe(
          tap(() => {
            this.successMessage = 'Registration successful!';
            this.router.navigate(['/login']);
          }),
          catchError((error) => {
            console.error('Error fetching vacancies:', error);
            this.errorMessage = 'Registration failed. Please try again.';
            return of(null);
          })
        )
        .subscribe();

      // this.authService.register(registerData).subscribe(
      //   () => {
      //     this.successMessage = 'Registration successful!';
      //     this.router.navigate(['/login']);
      //   },
      //   () => (this.errorMessage = 'Registration failed. Please try again.')
      // );
    }
  }

  switch() {
    this.switchToLogin.emit(false);
  }
}
