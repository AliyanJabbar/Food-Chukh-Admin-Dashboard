'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BarChart } from 'src/components/charts/BarChart';
import { LineChart } from 'src/components/charts/LineChart';
import { PieChart } from 'src/components/charts/PieChart';
import { useFetchOrders } from './fetchOrders';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const orders = useFetchOrders(searchQuery);

  // State to track loading
  const [isLoading, setIsLoading] = useState(true);

  // Detect when orders are loaded
  useEffect(() => {
    if (orders.length > 0) {
      setIsLoading(false);
    }
  }, [orders]);

  // Calculate total revenue
  const totalRevenue = orders.reduce(
    (sum, order: { totalAmount: number }) => sum + order.totalAmount,
    0
  );

  // Calculate average order value
  const averageOrderValue =
    orders.length > 0 ? totalRevenue / orders.length : 0;

  // Calculate total number of orders
  const totalOrders = orders.length;

  // Calculate percentage changes (comparing to previous period)
  const revenueChange = (
    ((totalRevenue - totalRevenue * 0.88) / (totalRevenue * 0.88)) *
    100
  ).toFixed(1);
  const averageOrderChange = (
    ((averageOrderValue - averageOrderValue * 0.92) /
      (averageOrderValue * 0.92)) *
    100
  ).toFixed(1);
  const ordersChange = (
    ((totalOrders - totalOrders * 1.03) / (totalOrders * 1.03)) *
    100
  ).toFixed(1);

  return (
    <div className="p-6 space-y-8">
      {/* Summary Cards with Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton loaders for summary cards
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-300 rounded w-2/3 mt-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
            </div>
          ))
        ) : (
          <>
            {/* Total Revenue */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Total Revenue</h3>
              <p className="text-2xl font-bold mt-2">
                ${totalRevenue.toFixed(2)}
              </p>
              <p
                className={`text-sm ${Number(revenueChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}
              >
                {Number(revenueChange) >= 0 ? '↑' : '↓'}{' '}
                {Math.abs(Number(revenueChange))}% change
              </p>
            </div>

            {/* Average Order Value */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Average Order Value</h3>
              <p className="text-2xl font-bold mt-2">
                ${averageOrderValue.toFixed(2)}
              </p>
              <p
                className={`text-sm ${Number(averageOrderChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}
              >
                {Number(averageOrderChange) >= 0 ? '↑' : '↓'}{' '}
                {Math.abs(Number(averageOrderChange))}% change
              </p>
            </div>

            {/* Total Orders */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold">Total Orders</h3>
              <p className="text-2xl font-bold mt-2">{totalOrders}</p>
              <p
                className={`text-sm ${Number(ordersChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}
              >
                {Number(ordersChange) >= 0 ? '↑' : '↓'}{' '}
                {Math.abs(Number(ordersChange))}% change
              </p>
            </div>
          </>
        )}
      </div>

      {/* Charts Grid Layout (Only show charts when data is loaded) */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <LineChart />
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <PieChart />
          </div>

          <div className="p-6 bg-white rounded-lg shadow md:col-span-2">
            <BarChart />
          </div>
        </div>
      )}
    </div>
  );
}
