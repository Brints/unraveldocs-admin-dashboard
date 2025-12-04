import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  SignupRequest,
  LoginRequest,
  AuthResponse,
  User,
  AuthState,
  ApiError
} from '../models/auth.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly API_URL = `${environment.apiUrl}`;

  // State management using signals
  private readonly authState = signal<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false
  });

  // Public computed values
  readonly user = computed(() => this.authState().user);
  readonly token = computed(() => this.authState().token);
  readonly isAuthenticated = computed(() => this.authState().isAuthenticated);

  // Loading and error states
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.loadAuthStateFromStorage();
  }

  /**
   * Sign up a new user
   */
  signup(request: SignupRequest): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post<AuthResponse>(`${this.API_URL}/admin/signup`, request).pipe(
      tap(response => {
        this.handleAuthSuccess(response);
      }),
      catchError(error => {
        this.handleAuthError(error);
        return throwError(() => error);
      }),
      tap(() => this.isLoading.set(false))
    );
  }

  /**
   * Log in an existing user
   */
  login(request: LoginRequest): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, request).pipe(
      tap(async response => {
        await this.handleAuthSuccess(response);
      }),
      catchError(error => {
        this.handleAuthError(error);
        return throwError(() => error);
      }),
      tap(() => this.isLoading.set(false))
    );
  }

  /**
   * Log out the current user
   */
  async logout(): Promise<void> {
    const token = localStorage.getItem('token');

    // Call logout endpoint to blacklist the token
    if (token) {
      try {
        await this.http.post(`${this.API_URL}/auth/logout`, {}).toPromise();
      } catch (error) {
        // Even if the API call fails, we still clear local state
        console.error('Logout API call failed:', error);
      }
    }

    this.clearAuthState();
    await this.router.navigate(['/auth/login']);
  }

  /**
   * Refresh the authentication token
   */
  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/refresh-token`, {
      refreshToken: localStorage.getItem('refreshToken')
    }).pipe(
      tap(async response => {
        await this.handleAuthSuccess(response);
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  /**
   * Get the current user profile
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/me`).pipe(
      tap(user => {
        this.authState.update(state => ({ ...state, user }));
      })
    );
  }

  /**
   * Check if user is authenticated
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  /**
   * Check if the role is an admin role (super_admin or admin)
   */
  isAdminRole(role: string): boolean {
    const normalizedRole = role.toLowerCase();
    return normalizedRole === 'super_admin' || normalizedRole === 'admin';
  }

  /**
   * Handle successful authentication
   */
  private async handleAuthSuccess(response: AuthResponse): Promise<void> {
    const { data } = response;

    // Store tokens
    localStorage.setItem('token', data.accessToken);
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken);
    }

    // Store user data
    const user: User = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      lastLogin: data.lastLogin,
      isActive: data.isActive,
      isVerified: data.isVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };

    localStorage.setItem('user', JSON.stringify(user));

    // Update auth state
    this.authState.set({
      user,
      token: data.accessToken,
      isAuthenticated: true
    });

    // Navigate to dashboard
    await this.router.navigate(['/dashboard']);
  }

  /**
   * Handle authentication errors
   */
  private handleAuthError(error: HttpErrorResponse): void {
    let errorMessage = 'An unexpected error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      const apiError = error.error as ApiError;
      errorMessage = apiError.message || `Error: ${error.status}`;
    }

    this.error.set(errorMessage);
    this.isLoading.set(false);
  }

  /**
   * Load authentication state from localStorage
   */
  private loadAuthStateFromStorage(): void {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson) as User;

        // Check if user has admin role
        if (user.role && this.isAdminRole(user.role)) {
          this.authState.set({
            user,
            token,
            isAuthenticated: true
          });
        } else {
          // User is not an admin, clear auth state
          this.clearAuthState();
        }
      } catch (e) {
        this.clearAuthState();
      }
    }
  }

  /**
   * Clear authentication state
   */
  private clearAuthState(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    this.authState.set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  }
}

