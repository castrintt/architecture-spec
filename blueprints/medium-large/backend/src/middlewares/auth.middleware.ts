/**
 * Authentication and RBAC Middleware Guard
 */
export interface AuthUser {
  userId: string;
  roles: string[];
}

export function authGuard(requiredRole?: string) {
  return async (req: { headers: Record<string, string | undefined>; user?: AuthUser }) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('UNAUTHORIZED: Token missing');
    }

    // Mock JWT payload decoding
    req.user = { userId: 'usr_mock_123', roles: ['ADMIN'] };

    if (requiredRole && !req.user.roles.includes(requiredRole)) {
      throw new Error('FORBIDDEN: Insufficient permissions');
    }
  };
}
