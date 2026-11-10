import React, { useEffect, useState } from 'react';
import { fetchItems, Item } from '../api/client.js';

/**
 * Single-File Monolith Pattern (Tier 1: Small):
 * In small projects, logic (useState, useEffect, handlers) and rendering (JSX)
 * reside in the SAME file. No Base, no separate Controller, no formal DI container.
 * 
 * Maximum delivery velocity with zero abstraction friction.
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

  if (isLoading) return <div>Loading catalog...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Item Catalog (Direct Monolith)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {items.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: 12, borderRadius: 6 }}>
            <h4>{item.title}</h4>
            <p style={{ fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
