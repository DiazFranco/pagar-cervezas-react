import { useEffect, useState } from 'react';
import { TransactionTable } from '../components/TransactionTable/TransactionTable';
import { Navbar } from '@/components/Navbar/Navbar';
import { Modal } from '@/components/Modal/Modal';

const Home = () => {
  const [stock, setStock] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [modalData, setModalData] = useState<{ name: string; quantity: number }[]>([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch('/api/services/getStock');
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos');
        }
        const data = await response.json();
        setStock(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openModal = () => {
    setIsOpen(true);
    setModalData(Object.keys(selectedItems)
      .filter((productName) => selectedItems[productName] > 0)
      .map((productName) => ({
        name: productName,
        quantity: selectedItems[productName],
      })));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleQuantityChange = (productName: string, quantity: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productName]: quantity,
    }));
  };

  const handleCreateOrder = () => {
    openModal();
  };

  const handleModalAction = async (action: 'accept' | 'cancel') => {
    if (action === 'accept') {
      try {
        const orderData = { items: modalData };
        const response = await fetch('/api/services/createOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error('Error al crear la orden');
        }

        await response.json();
        window.location.reload();
      } catch (error) {
        console.error('Error al crear la orden:', error);
      }
    }
    closeModal();
  };

  return (
    <>
      <Navbar />
      <div className="px-4">
        <TransactionTable stock={stock.beers} selectedItems={selectedItems} onQuantityChange={handleQuantityChange} />
      </div>
      <div className="flex justify-center mt-20">
        <button
          onClick={handleCreateOrder}
          className="block text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="button"
        >
          Crear Orden
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        data={modalData}
        closeModal={closeModal}
        handleModalAction={handleModalAction}
      />
    </>
  );
};

export default Home;
