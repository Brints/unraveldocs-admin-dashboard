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

  private readonly API_URL = `${environment.apiUrl}/auth`;

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

    return this.http.post<AuthResponse>(`${this.API_URL}/signup`, request).pipe(
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

    return this.http.post<AuthResponse>(`${this.API_URL}/login`, request).pipe(
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
   * Log out the current user
   */
  logout(): void {
    this.clearAuthState();
    this.router.navigate(['/auth/login']);
  }

  /**
   * Refresh the authentication token
   */
  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, {
      refreshToken: localStorage.getItem('refreshToken')
    }).pipe(
      tap(response => {
        this.handleAuthSuccess(response);
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
   * Handle successful authentication
   */
  private handleAuthSuccess(response: AuthResponse): void {
    // Store tokens
    localStorage.setItem('token', response.token);
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }

    // Update auth state
    this.authState.set({
      user: response.user,
      token: response.token,
      isAuthenticated: true
    });

    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
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
        this.authState.set({
          user,
          token,
          isAuthenticated: true
        });
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

