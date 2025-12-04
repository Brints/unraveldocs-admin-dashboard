export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  statusCode: number;
  status: string;
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    lastLogin?: string;
    isActive: boolean;
    isVerified: boolean;
    accessToken: string;
    refreshToken: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  lastLogin?: string;
  isActive?: boolean;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: ValidationError[];
  statusCode?: number;
}

