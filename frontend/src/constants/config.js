// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://management-system-9w3n.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    VERIFY: '/api/auth/verify',
  },
  STUDENTS: {
    LIST: '/api/students',
    GET: (id) => `/api/students/${id}`,
    CREATE: '/api/students',
    UPDATE: (id) => `/api/students/${id}`,
    DELETE: (id) => `/api/students/${id}`,
  },
  INSTRUCTORS: {
    LIST: '/api/instructors',
    GET: (id) => `/api/instructors/${id}`,
    CREATE: '/api/instructors',
    UPDATE: (id) => `/api/instructors/${id}`,
    DELETE: (id) => `/api/instructors/${id}`,
  },
  COURSES: {
    LIST: '/api/courses',
    GET: (id) => `/api/courses/${id}`,
    CREATE: '/api/courses',
    UPDATE: (id) => `/api/courses/${id}`,
    DELETE: (id) => `/api/courses/${id}`,
  },
  FEES: {
    LIST: '/api/fees',
    GET: (id) => `/api/fees/${id}`,
    CREATE: '/api/fees',
    UPDATE: (id) => `/api/fees/${id}`,
    DELETE: (id) => `/api/fees/${id}`,
  },
  ATTENDANCE: {
    LIST: '/api/attendance',
    GET: (id) => `/api/attendance/${id}`,
    CREATE: '/api/attendance',
    UPDATE: (id) => `/api/attendance/${id}`,
    DELETE: (id) => `/api/attendance/${id}`,
  },
};

// Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_EXISTS: 'Email already registered.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};
