import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignupRequest } from '../../models/auth.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Form state
  signupForm: FormGroup;
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // Password visibility toggles
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  // Field-specific error messages
  fieldErrors = signal<Record<string, string>>({});

  constructor() {
    this.signupForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s'-]+$/)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s'-]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]],
      code: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z0-9-]+$/)
      ]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  /**
   * Custom validator for password strength
   */
  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (!password) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    if (!passwordValid) {
      return {
        passwordStrength: {
          hasUpperCase,
          hasLowerCase,
          hasNumeric,
          hasSpecialChar
        }
      };
    }

    return null;
  }

  /**
   * Custom validator to check if passwords match
   */
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (confirmPassword.value === '') {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  /**
   * Get form control for template access
   */
  getControl(name: string) {
    return this.signupForm.get(name);
  }

  /**
   * Check if a field has errors and has been touched
   */
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.signupForm.get(fieldName);
    if (!field) return false;

    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }

    return field.invalid && (field.dirty || field.touched);
  }

  /**
   * Get error message for a specific field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;

    if (errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }

    if (errors['email'] || errors['pattern']) {
      if (fieldName === 'email') {
        return 'Please enter a valid email address';
      }
      if (fieldName === 'firstName' || fieldName === 'lastName') {
        return `${this.getFieldLabel(fieldName)} can only contain letters, spaces, hyphens, and apostrophes`;
      }
      if (fieldName === 'code') {
        return 'Code must contain only uppercase letters, numbers, and hyphens';
      }
    }

    if (errors['minlength']) {
      return `${this.getFieldLabel(fieldName)} must be at least ${errors['minlength'].requiredLength} characters`;
    }

    if (errors['maxlength']) {
      return `${this.getFieldLabel(fieldName)} must not exceed ${errors['maxlength'].requiredLength} characters`;
    }

    if (errors['passwordStrength']) {
      const requirements = [];
      if (!errors['passwordStrength'].hasUpperCase) requirements.push('one uppercase letter');
      if (!errors['passwordStrength'].hasLowerCase) requirements.push('one lowercase letter');
      if (!errors['passwordStrength'].hasNumeric) requirements.push('one number');
      if (!errors['passwordStrength'].hasSpecialChar) requirements.push('one special character');
      return `Password must contain ${requirements.join(', ')}`;
    }

    return '';
  }

  /**
   * Get form-level error message (e.g., password mismatch)
   */
  getFormError(): string {
    if (this.signupForm.errors?.['passwordMismatch']) {
      return 'Passwords do not match';
    }
    return '';
  }

  /**
   * Get field label for error messages
   */
  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      code: 'Access code'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword.update(v => !v);
    } else {
      this.showConfirmPassword.update(v => !v);
    }
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    this.signupForm.markAllAsTouched();

    if (this.signupForm.invalid) {
      this.errorMessage.set('Please fix the errors in the form');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const signupData: SignupRequest = this.signupForm.value;

    this.authService.signup(signupData).subscribe({
      next: (response) => {
        this.successMessage.set('Account created successfully! Redirecting to dashboard...');
        this.isSubmitting.set(false);
        // AuthService handles navigation
      },
      error: (error) => {
        this.isSubmitting.set(false);

        // Handle field-specific errors from backend
        if (error.error?.errors && Array.isArray(error.error.errors)) {
          const fieldErrors: Record<string, string> = {};
          error.error.errors.forEach((err: any) => {
            if (err.field && err.message) {
              fieldErrors[err.field] = err.message;
            }
          });
          this.fieldErrors.set(fieldErrors);
        }

        // Set general error message
        const errorMsg = error.error?.message || 'Signup failed. Please try again.';
        this.errorMessage.set(errorMsg);
      }
    });
  }

  /**
   * Reset form
   */
  resetForm(): void {
    this.signupForm.reset();
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.fieldErrors.set({});
  }
}

