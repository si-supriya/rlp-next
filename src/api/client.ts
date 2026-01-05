import { fetcher } from '../lib/fetcher';

export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  async get<T>(endpoint: string): Promise<T> {
    return fetcher<T>(`${this.baseURL}${endpoint}`, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return fetcher<T>(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return fetcher<T>(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return fetcher<T>(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
