import { apiClient } from './client';
import type { LoginRequest, LoginResponse, LogoutResponse } from './types';

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', credentials);
  },

  async logout(): Promise<LogoutResponse> {
    return apiClient.post<LogoutResponse>('/auth/logout');
  },
};
