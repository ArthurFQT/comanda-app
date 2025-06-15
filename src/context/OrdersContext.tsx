import React, { createContext, useContext, useState } from 'react';
import { Order } from '../types/Order';

interface OrdersContextData {
  orders: Order[]; // só pendentes
  allOrders: Order[]; // todos os pedidos do turno
  addOrder: (name: string, quantity: number, flavor: string) => void;
  completeOrder: (id: string) => void;
}

const OrdersContext = createContext({} as OrdersContextData);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  const generateId = () =>
    `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  const addOrder = (name: string, quantity: number, flavor: string) => {
    const newOrder: Order = {
      id: generateId(),
      name,
      quantity,
      flavor,
      createdAt: new Date(),
      status: 'pending',
    };
    setAllOrders(prev => [...prev, newOrder]);
  };


  const completeOrder = (id: string) => {
    setAllOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: 'completed', completedAt: new Date() }
          : order,
      ),
    );
  };

  const orders = allOrders.filter(order => order.status === 'pending');

  return (
    <OrdersContext.Provider value={{ orders, allOrders, addOrder, completeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
