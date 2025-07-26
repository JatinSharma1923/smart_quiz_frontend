import axiosInstance from './axiosInstance';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  total_quizzes: number;
  correct_answers: number;
  total_questions: number;
  accuracy: number;
  rank: number;
  score: number;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned_at: string;
}

export interface UserSession {
  id: string;
  device: string;
  location: string;
  created_at: string;
  is_active: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  date_of_birth?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refresh_token: string;
}

// Authentication APIs
export const login = async (request: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', request);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};

export const register = async (request: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post('/auth/register', request);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Logout failed');
  }
};

export const refreshToken = async (refreshToken: string): Promise<{ token: string }> => {
  try {
    const response = await axiosInstance.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw new Error('Token refresh failed');
  }
};

// User Profile APIs
export const getUserProfile = async (userId: string): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<User> => {
  try {
    const response = await axiosInstance.put(`/user/${userId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile');
  }
};

export const changePassword = async (userId: string, currentPassword: string, newPassword: string): Promise<void> => {
  try {
    await axiosInstance.put(`/user/${userId}/password`, {
      current_password: currentPassword,
      new_password: newPassword
    });
  } catch (error) {
    console.error('Error changing password:', error);
    throw new Error('Failed to change password');
  }
};

// User Stats APIs
export const getUserStats = async (userId: string): Promise<UserStats> => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw new Error('Failed to fetch user stats');
  }
};

export const getUserBadges = async (userId: string): Promise<UserBadge[]> => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/badges`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user badges:', error);
    throw new Error('Failed to fetch user badges');
  }
};

export const getUserSessions = async (userId: string): Promise<UserSession[]> => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/sessions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    throw new Error('Failed to fetch user sessions');
  }
};

export const terminateSession = async (userId: string, sessionId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/user/${userId}/sessions/${sessionId}`);
  } catch (error) {
    console.error('Error terminating session:', error);
    throw new Error('Failed to terminate session');
  }
};

// Current User APIs
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get('/user/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw new Error('Failed to fetch current user');
  }
};

export const updateCurrentUser = async (updates: Partial<User>): Promise<User> => {
  try {
    const response = await axiosInstance.put('/user/me', updates);
    return response.data;
  } catch (error) {
    console.error('Error updating current user:', error);
    throw new Error('Failed to update current user');
  }
};

export default {
  login,
  register,
  logout,
  refreshToken,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUserStats,
  getUserBadges,
  getUserSessions,
  terminateSession,
  getCurrentUser,
  updateCurrentUser,
};