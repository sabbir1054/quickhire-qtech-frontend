export type AuthUser = {
  id?: string;
  userId?: string;
  name: string;
  email?: string;
  role?: string;
} | null;

export interface AuthState {
  user: AuthUser;
  accessToken: string | null;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errorMessages?: { path: string; message: string }[];
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterData {
  id: string;
  role: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}
