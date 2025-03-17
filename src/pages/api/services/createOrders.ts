import type { NextApiRequest, NextApiResponse } from 'next';

const createOrder = async (orderData: { items: { name: string; quantity: number }[] }) => {
  const res = await fetch('http://127.0.0.1:8000/orders/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData), 
  });

  if (!res.ok) {
    throw new Error('Error al crear la orden');
  }
  return res.json();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const orderData = req.body;
      const newOrder = await createOrder(orderData);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la orden' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
