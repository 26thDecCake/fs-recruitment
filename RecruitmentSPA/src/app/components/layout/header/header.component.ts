import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserDetailDTO } from '../../../models/auth';
import { tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    RouterModule,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user?: UserDetailDTO | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .getUserDetail()
      .pipe(
        catchError((error) => {
          console.error('Error fetching vacancies:', error);
          return of(null);
        })
      )
      .subscribe((userData: UserDetailDTO | null) => {
        this.user = userData;
        console.log(this.user);
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
