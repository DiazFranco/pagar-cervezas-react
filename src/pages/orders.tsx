import { TransactionTable } from '@/components/TransactionTable/TransactionTable';
import { TransactionTableOrder } from '@/components/TransactionTableOrder/TransactionTableOrder';
import { Navbar } from '@/components/Navbar/Navbar';
import { useEffect, useState } from 'react';


const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch('/api/services/getOrders');
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos de las órdenes');
        }
        const data = await response.json();
        setOrders(data.rounds);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return <div>Cargando órdenes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
       <Navbar />
      <h1 className="text-2xl pl-12 pt-12 font-bold mb-4">Órdenes creadas</h1>
      <TransactionTableOrder stock={orders} />
    </div>
  );
};

export default OrdersPage;
