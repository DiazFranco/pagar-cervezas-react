import React from 'react';

const formatDateTime = (datetime: string) => {
    const datePart = datetime.slice(0, 8);
    
    const formattedDate = `${datePart.slice(6, 8)}-${datePart.slice(4, 6)}-${datePart.slice(0, 4)}`;
  
    return `${formattedDate}`;
  };

export const TransactionTableOrder = ({ stock }: { stock: any[] }) => {
  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((round, index) => (
            <React.Fragment key={index}>
              {round.items.map((item: any, itemIndex: number) => (
                <tr key={itemIndex}>
                  <td className="border px-4 py-2">{formatDateTime(round.created)}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
