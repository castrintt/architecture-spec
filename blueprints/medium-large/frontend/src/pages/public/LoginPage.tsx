import React, { useState } from 'react';
import { Button } from '../../design-system/Button.js';
import { authStore } from '../../store/auth.store.js';

/**
 * Public Page: Login
 */
export function LoginPage() {
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    authStore.setState({
      isAuthenticated: true,
      user: {
        userId: 'usr_123',
        name: email.split('@')[0] || 'User',
        token: 'jwt_mock_token',
        roles: ['ADMIN'],
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h2>Sign In to Platform</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Corporate email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 8 }}
        />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}
