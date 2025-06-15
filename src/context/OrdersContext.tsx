import React, { createContext, useContext, useEffect, useState } from 'react';
import { Order } from '../types/Order';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../firebase';

interface OrdersContextData {
  orders: Order[]; // só pendentes
  allOrders: Order[]; // todos os pedidos do turno
  addOrder: (name: string, quantity: number, flavor: string) => Promise<void>;
  completeOrder: (id: string) => Promise<void>;
}

const OrdersContext = createContext({} as OrdersContextData);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  useEffect(() => {
    const ordersRef = collection(db, 'orders');

    // Escuta em tempo real todos pedidos do turno (aqui sem filtro, mas pode filtrar se quiser)
    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          quantity: data.quantity,
          flavor: data.flavor,
          createdAt: data.createdAt.toDate(),
          status: data.status,
          completedAt: data.completedAt ? data.completedAt.toDate() : undefined,
        } as Order;
      });
      setAllOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  async function addOrder(name: string, quantity: number, flavor: string) {
    await addDoc(collection(db, 'orders'), {
      name,
      quantity,
      flavor,
      createdAt: new Date(),
      status: 'pending',
    });
  }

  async function completeOrder(id: string) {
    const orderDocRef = doc(db, 'orders', id);
    await updateDoc(orderDocRef, {
      status: 'completed',
      completedAt: new Date(),
    });
  }

  const orders = allOrders.filter((order) => order.status === 'pending');

  return (
    <OrdersContext.Provider
      value={{ orders, allOrders, addOrder, completeOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
