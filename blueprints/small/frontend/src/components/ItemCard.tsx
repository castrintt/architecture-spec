import React from 'react';
import { Item } from '../api/client.js';

export function ItemCard({ item }: { item: Item }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
      <h4>{item.title}</h4>
      <p>R$ {item.price.toFixed(2)}</p>
    </div>
  );
}

