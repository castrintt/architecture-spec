import { authStore } from '../store/auth.store.js';

/**
 * Route authorization guard for private pages (RBAC).
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
