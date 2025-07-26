import axiosInstance from './axiosInstance';

export interface SystemStats {
  total_users: number;
  total_quizzes: number;
  total_attempts: number;
  active_sessions: number;
  system_uptime: number;
  average_response_time: number;
  error_rate: number;
}

export interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  is_active: boolean;
  created_at: string;
  last_used?: string;
  permissions: string[];
}

export interface LogEntry {
  id: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
}

export interface HealthStatus {
  database: 'healthy' | 'unhealthy';
  redis: 'healthy' | 'unhealthy';
  openai: 'healthy' | 'unhealthy';
  overall: 'healthy' | 'unhealthy';
  last_check: string;
}

export interface CacheStatus {
  total_keys: number;
  memory_usage: number;
  hit_rate: number;
  last_cleared: string;
}

// System Stats APIs
export const getSystemStats = async (): Promise<SystemStats> => {
  try {
    const response = await axiosInstance.get('/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching system stats:', error);
    throw new Error('Failed to fetch system stats');
  }
};

// API Keys Management APIs
export const getApiKeys = async (): Promise<ApiKey[]> => {
  try {
    const response = await axiosInstance.get('/admin/api-keys');
    return response.data;
  } catch (error) {
    console.error('Error fetching API keys:', error);
    throw new Error('Failed to fetch API keys');
  }
};

export const createApiKey = async (name: string, permissions: string[]): Promise<ApiKey> => {
  try {
    const response = await axiosInstance.post('/admin/api-keys', {
      name,
      permissions
    });
    return response.data;
  } catch (error) {
    console.error('Error creating API key:', error);
    throw new Error('Failed to create API key');
  }
};

export const toggleApiKey = async (keyId: string, isActive: boolean): Promise<void> => {
  try {
    await axiosInstance.put(`/admin/api-keys/${keyId}`, {
      is_active: isActive
    });
  } catch (error) {
    console.error('Error toggling API key:', error);
    throw new Error('Failed to toggle API key');
  }
};

export const deleteApiKey = async (keyId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/admin/api-keys/${keyId}`);
  } catch (error) {
    console.error('Error deleting API key:', error);
    throw new Error('Failed to delete API key');
  }
};

// Logs APIs
export const getLogs = async (level?: string, limit?: number): Promise<LogEntry[]> => {
  try {
    const params: any = {};
    if (level) params.level = level;
    if (limit) params.limit = limit;
    
    const response = await axiosInstance.get('/admin/logs', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw new Error('Failed to fetch logs');
  }
};

export const getFeedbackLogs = async (): Promise<LogEntry[]> => {
  try {
    const response = await axiosInstance.get('/admin/logs/feedback');
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback logs:', error);
    throw new Error('Failed to fetch feedback logs');
  }
};

export const getErrorLogs = async (): Promise<LogEntry[]> => {
  try {
    const response = await axiosInstance.get('/admin/logs/errors');
    return response.data;
  } catch (error) {
    console.error('Error fetching error logs:', error);
    throw new Error('Failed to fetch error logs');
  }
};

export const getSessionLogs = async (): Promise<LogEntry[]> => {
  try {
    const response = await axiosInstance.get('/admin/logs/sessions');
    return response.data;
  } catch (error) {
    console.error('Error fetching session logs:', error);
    throw new Error('Failed to fetch session logs');
  }
};

export const getRequestLogs = async (): Promise<LogEntry[]> => {
  try {
    const response = await axiosInstance.get('/admin/logs/requests');
    return response.data;
  } catch (error) {
    console.error('Error fetching request logs:', error);
    throw new Error('Failed to fetch request logs');
  }
};

// Health Check APIs
export const getHealthStatus = async (): Promise<HealthStatus> => {
  try {
    const response = await axiosInstance.get('/admin/health');
    return response.data;
  } catch (error) {
    console.error('Error fetching health status:', error);
    throw new Error('Failed to fetch health status');
  }
};

export const getCacheStatus = async (): Promise<CacheStatus> => {
  try {
    const response = await axiosInstance.get('/admin/cache/status');
    return response.data;
  } catch (error) {
    console.error('Error fetching cache status:', error);
    throw new Error('Failed to fetch cache status');
  }
};

export const clearCache = async (): Promise<void> => {
  try {
    await axiosInstance.delete('/admin/cache/clear');
  } catch (error) {
    console.error('Error clearing cache:', error);
    throw new Error('Failed to clear cache');
  }
};

export const getOpenAIStatus = async (): Promise<{ status: string; message: string }> => {
  try {
    const response = await axiosInstance.get('/admin/health/openai');
    return response.data;
  } catch (error) {
    console.error('Error fetching OpenAI status:', error);
    throw new Error('Failed to fetch OpenAI status');
  }
};

// User Management APIs
export const getAllUsers = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw new Error('Failed to fetch all users');
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/admin/users/${userId}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};

export const suspendUser = async (userId: string, reason: string): Promise<void> => {
  try {
    await axiosInstance.put(`/admin/users/${userId}/suspend`, { reason });
  } catch (error) {
    console.error('Error suspending user:', error);
    throw new Error('Failed to suspend user');
  }
};

export const activateUser = async (userId: string): Promise<void> => {
  try {
    await axiosInstance.put(`/admin/users/${userId}/activate`);
  } catch (error) {
    console.error('Error activating user:', error);
    throw new Error('Failed to activate user');
  }
};

export default {
  getSystemStats,
  getApiKeys,
  createApiKey,
  toggleApiKey,
  deleteApiKey,
  getLogs,
  getFeedbackLogs,
  getErrorLogs,
  getSessionLogs,
  getRequestLogs,
  getHealthStatus,
  getCacheStatus,
  clearCache,
  getOpenAIStatus,
  getAllUsers,
  deleteUser,
  suspendUser,
  activateUser,
};