export interface Item {
  id: string;
  title: string;
  price: number;
}

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch('/api/items');
  if (!response.ok) throw new Error('Falha ao buscar itens');
  return response.json();
}

