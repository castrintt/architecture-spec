import React, { useEffect, useState } from 'react';
import { fetchItems, Item } from '../api/client.js';

/**
 * Padrão Monólito Single-File (Tier 1: Small):
 * Em projetos pequenos, a lógica (useState, useEffect, handlers) e a renderização (JSX)
 * residem no MESMO arquivo. Sem Base, sem Controller separado e sem injeção formal.
 * 
 * Máxima velocidade de entrega e zero atrito de abstração.
 */
export function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Carregando catálogo...</div>;
  if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Catálogo de Itens (Monólito Direto)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {items.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: 12, borderRadius: 6 }}>
            <h4>{item.title}</h4>
            <p style={{ fontWeight: 'bold' }}>R$ {item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
