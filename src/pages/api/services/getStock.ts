import type { NextApiRequest, NextApiResponse } from 'next';

const getStock = async () => {
  const res = await fetch('http://127.0.0.1:8000/orders/stock');
  if (!res.ok) {
    throw new Error('Error al obtener los datos del stock');
  }
  return res.json();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const stock = await getStock();
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el stock' });
  }
}


