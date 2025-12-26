export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Login failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Store token in localStorage - handle nested structure
    const token = data.data?.token || data.token;
    if (token) {
      localStorage.setItem('auth_token', token);
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(userData: RegisterData): Promise<AuthResponse> {
  try {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    const response = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Registration failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Store token in localStorage - handle nested structure
    const token = data.data?.token || data.token;
    if (token) {
      localStorage.setItem('auth_token', token);
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem('auth_token');
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
