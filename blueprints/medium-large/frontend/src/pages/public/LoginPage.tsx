import React, { useState } from 'react';
import { Button } from '../../design-system/Button.js';
import { authStore } from '../../store/auth.store.js';

/**
 * Camada src/pages (Pública):
 * Tela de login simples.
 */
export function LoginPage() {
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    authStore.setState({
      isAuthenticated: true,
      user: {
        userId: 'usr_123',
        name: email.split('@')[0] || 'Usuário',
        token: 'jwt_mock_token',
        roles: ['ADMIN'],
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h2>Acesso ao Sistema</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Seu e-mail institucional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 8 }}
        />
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}

