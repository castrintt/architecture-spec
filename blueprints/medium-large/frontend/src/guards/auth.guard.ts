import { authStore } from '../store/auth.store.js';

/**
 * Camada src/guard:
 * Segurança de rotas privadas e autorização por perfis (RBAC).
 */
export function canActivatePrivate(requiredRole?: string): boolean {
  const { isAuthenticated, user } = authStore.getState();

  if (!isAuthenticated || !user) {
    return false;
  }

  if (requiredRole && !user.roles.includes(requiredRole)) {
    return false;
  }

  return true;
}

