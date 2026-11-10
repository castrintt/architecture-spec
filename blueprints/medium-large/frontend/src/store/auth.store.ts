export interface UserSession {
  userId: string;
  name: string;
  token: string;
  roles: string[];
}

type Listener<T> = (value: T) => void;

/**
 * Framework-Agnostic Observable Store for low-frequency global state (session, auth).
 */
class ObservableStore<T> {
  private listeners: Set<Listener<T>> = new Set();

  constructor(private state: T) {}

  getState(): T {
    return this.state;
  }

  setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export interface AuthState {
  user: UserSession | null;
  isAuthenticated: boolean;
}

export const authStore = new ObservableStore<AuthState>({
  user: null,
  isAuthenticated: false,
});
