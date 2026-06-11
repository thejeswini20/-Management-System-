const API_URL = process.env.REACT_APP_API_URL || 'https://management-system-9w3n.onrender.com';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      headers: defaultHeaders,
      ...options,
    });

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Server returned non-JSON response (Status ${response.status}): ${text.substring(0, 150)}...`);
    }

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status} ${response.statusText}`);
    }

    // If response has a 'data' property, return the entire response for consistency
    // Otherwise return just the data
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const get = (endpoint) => apiCall(endpoint, { method: 'GET' });
export const post = (endpoint, data) => apiCall(endpoint, { method: 'POST', body: JSON.stringify(data) });
export const put = (endpoint, data) => apiCall(endpoint, { method: 'PUT', body: JSON.stringify(data) });
export const del = (endpoint) => apiCall(endpoint, { method: 'DELETE' });
