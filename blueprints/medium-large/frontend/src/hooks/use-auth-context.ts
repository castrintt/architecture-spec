import { useState, useEffect } from 'react';
import { authStore, AuthState } from '../store/auth.store.js';

/**
 * Framework-agnostic hook synchronizing the View with the Observable AuthStore.
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
