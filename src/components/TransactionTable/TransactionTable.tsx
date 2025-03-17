import { useState } from 'react';

interface StockBeer {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface TransactionTableProps {
  stock: any[];
  selectedItems: { [key: string]: number };
  onQuantityChange: (productName: string, quantity: number) => void;
}

export const TransactionTable = ({ stock, selectedItems, onQuantityChange }: TransactionTableProps) => {

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Producto
            </th>
            <th scope="col" className="px-6 py-3">
              Cantidad
            </th>
            <th scope="col" className="px-6 py-3">
              Precio
            </th>
          </tr>
        </thead>
        <tbody>
          {stock?.map((product, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src={product.image}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt={product.name}
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.name}
              </td>
              <td className="px-6 py-4">
                {product.quantity > 0 ? (
                 <select
                 value={selectedItems[product.name] || 0}
                 onChange={(e) => onQuantityChange(product.name, Number(e.target.value))}
                 className="px-2 py-1 border border-gray-300 rounded-md"
               >
                 <option value={0}>0</option>
                 {Array.from({ length: product.quantity }, (_, i) => (
                   <option key={i + 1} value={i + 1}>
                     {i + 1}
                   </option>
                 ))}
               </select>
                ) : (
                  <span>Agotado</span>
                )}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ${product.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
