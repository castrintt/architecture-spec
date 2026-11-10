/**
 * Centralized Route Table (Public and Private routes)
 */
export const ROUTES = {
  PUBLIC: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  PRIVATE: {
    DASHBOARD: '/dashboard',
    CHECKOUT: '/checkout',
    ORDERS: '/orders',
    SETTINGS: '/settings',
  },
} as const;
