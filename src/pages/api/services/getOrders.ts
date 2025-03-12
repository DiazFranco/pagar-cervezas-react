import type { NextApiRequest, NextApiResponse } from 'next';

const getOrderData = async () => {
  const res = await fetch('http://127.0.0.1:8000/orders/status');
  if (!res.ok) {
    throw new Error('Error al obtener los datos de la orden');
  }
  return res.json();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const orderData = await getOrderData();
    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la orden' });
  }
}


