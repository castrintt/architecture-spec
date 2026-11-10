import { useState, useEffect } from 'react';
import { authStore, AuthState } from '../store/auth.store.js';

/**
 * Camada src/hooks:
 * Hook agnóstico ao framework para sincronizar a View com o estado compartilhado da Store.
 */
export function useAuthContext(): AuthState {
  const [state, setState] = useState<AuthState>(authStore.getState());

  useEffect(() => {
    const unsubscribe = authStore.subscribe((updatedState) => {
      setState(updatedState);
    });
    return () => unsubscribe();
  }, []);

  return state;
}

