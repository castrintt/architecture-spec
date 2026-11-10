/**
 * Camada src/routes:
 * Definição centralizada de rotas da aplicação (públicas e privadas).
 */
export const ROUTES = {
  PUBLIC: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  PRIVATE: {
    DASHBOARD: '/dashboard',
    ORDERS: '/orders',
    SETTINGS: '/settings',
  },
} as const;

