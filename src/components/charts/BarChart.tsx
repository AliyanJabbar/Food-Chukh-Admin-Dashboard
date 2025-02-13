'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useFetchFoods } from 'src/app/(dashboard)/fetchfoods';
import { useFetchOrders } from 'src/app/(dashboard)/fetchOrders';

export const BarChart: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const products = useFetchFoods(searchQuery);
  const orders = useFetchOrders(searchQuery);

  // Process orders to count items by product name
  const processedOrderData = orders.reduce(
    (acc: { name: string; orders: number }[], order: any) => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item: any) => {
          const existingProduct = acc.find((p) => p.name === item.name);
          if (existingProduct) {
            existingProduct.orders += item.quantity;
          } else {
            acc.push({ name: item.name, orders: item.quantity });
          }
        });
      }
      return acc;
    },
    []
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = document.getElementById('bar-chart');
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-lg border">
          <p className="font-bold text-gray-800">{label}</p>
          <p className="text-blue-600">{`Orders: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="bar-chart"
      className="transition-opacity duration-1000 ease-in-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Product Orders Distribution</h3>
        <p className="text-sm text-gray-500">Number of orders per product</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={processedOrderData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" height={70} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="orders"
            fill="#8884d8"
            animationBegin={0}
            animationDuration={3000}
            animationEasing="ease-in-out"
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
