import { apiClient } from './client';
import type { User } from './types';

export const userApi = {
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/user/me');
  },

  async updateUser(userData: Partial<User>): Promise<User> {
    return apiClient.put<User>('/user/me', userData);
  },

  async getUsers(): Promise<User[]> {
    return apiClient.get<User[]>('/users');
  },
};
