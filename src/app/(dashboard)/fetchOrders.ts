"use client"
import { client } from '../../sanity/lib/client';
import { useEffect, useState } from 'react';

export function useFetchOrders(searchQuery: string) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "order"]`;
        const data = await client.fetch(query);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    if (navigator.onLine) {
      fetchData();
    }

    const handleOnline = () => {
      fetchData();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [searchQuery]);

  return orders;
}
