// Authentication utility functions
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://secondbrain.up.railway.app';

// Debug logging (remove in production)
console.log('Backend URL:', BACKEND_URL);

// Set cookie helper function
export const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

// Get cookie helper function
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Delete cookie helper function
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// API call helper function
const apiCall = async (endpoint, options = {}) => {
  const url = `${BACKEND_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Login function
export const loginUser = async (username, password) => {
  try {
    const response = await apiCall('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.success && response.token) {
      // Set session cookie
      setCookie('session_token', response.token, 7);
      return response;
    }
    
    throw new Error(response.message || 'Login failed');
  } catch (error) {
    throw error;
  }
};

// Register function
export const registerUser = async (userData) => {
  try {
    const response = await apiCall('/api/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.token) {
      // Set session cookie
      setCookie('session_token', response.token, 7);
      return response;
    }
    
    throw new Error(response.message || 'Registration failed');
  } catch (error) {
    throw error;
  }
};

// Verify session function
export const verifySession = async () => {
  try {
    const token = getCookie('session_token');
    if (!token) {
      return null;
    }

    const response = await apiCall('/api/user/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.success ? response.user : null;
  } catch (error) {
    // If verification fails, clear the cookie
    deleteCookie('session_token');
    return null;
  }
};

// Logout function
export const logoutUser = () => {
  deleteCookie('session_token');
};
