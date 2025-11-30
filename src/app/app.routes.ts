import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'api-keys',
    loadComponent: () => import('./pages/api-keys/api-keys.component').then(m => m.ApiKeysComponent),
    // canActivate: [authGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
    // canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
