import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VacancyComponent } from './components/vacancy/vacancy.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
  {
    path: 'vacancy',
    component: VacancyComponent,
    canActivate: [AuthGuard],
    title: 'Vacancy',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'Home',
  },
  {
    path: 'account',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'Account',
  },
  {
    path: 'profiles',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'Profiles',
  },
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: '**',
    component: LandingComponent,
  },
];
