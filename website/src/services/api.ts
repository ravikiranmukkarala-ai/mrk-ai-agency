/**
 * Base API client service for MRK AI Agency.
 * Configured with environment variables, ready for Phase 2 backend integration.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // If no backend endpoint configured (Phase 1 Frontend Mode), throw or delegate to service mocks
  if (!API_BASE_URL) {
    return {
      success: false,
      error: 'Backend API endpoint not configured. Operating in Phase 1 client mode.',
      timestamp: new Date().toISOString()
    };
  }

  try {
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
      timestamp: new Date().toISOString()
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Unknown network error occurred',
      timestamp: new Date().toISOString()
    };
  }
}
