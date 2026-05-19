import { apiPost, setAuthToken } from './client';
import type { User } from '@/types';

interface RegisterData {
  phone: string;
  name: string;
  email: string;
}

interface VerifyData {
  phone: string;
  otp: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/api/auth/register', data);
}

export async function verifyOtp(data: VerifyData): Promise<AuthResponse> {
  const response = await apiPost<AuthResponse>('/api/auth/verify', data);
  setAuthToken(response.token);
  return response;
}

export async function logout(): Promise<void> {
  setAuthToken(null);
}
