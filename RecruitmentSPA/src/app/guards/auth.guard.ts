import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // Logged in, so return true
      return true;
    }
    // Not logged in, so redirect to login page
    this.router.navigate(['/']);
    return false;
  }
}
