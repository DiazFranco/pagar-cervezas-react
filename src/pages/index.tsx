import { useEffect, useState } from 'react';

const OrderPage = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>('');

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await fetch('/api/services/getOrders');
      const data = await response.json();
      console.log(JSON.stringify(data))
      setOrder(data);
    };
    fetchOrderData();
  }, []);

  

  const createOrder = async () => {
    const newOrder = {
      items: [
        { name: 'Corona', quantity: 2 },
        { name: 'Club Colombia', quantity: 1 },
      ],
    };

    try {
      const response = await fetch('/api/services/createOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error('Error al crear la orden');
      }

      const data = await response.json();
      setOrderStatus(`Orden creada: ${JSON.stringify(data)}`);
    } catch (error) {
      setOrderStatus('Hubo un error al crear la orden.');
    }
  };

  if (!order) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Resumen de la Orden</h1>
      <ul>
        {order.items.map((item: any, index: number) => (
          <li key={index}>
            {item.name}: {item.quantity} x {item.price_per_unit}
          </li>
        ))}
      </ul>
      <div>
        <p>Subtotal: {order.subtotal}</p>
        <p>Impuestos: {order.taxes}</p>
        <p>Total: {order.subtotal + order.taxes}</p>
      </div>
      <button onClick={createOrder}>Crear Orden</button>
      <p>{orderStatus}</p>
    </div>
  );
};

export default OrderPage;
