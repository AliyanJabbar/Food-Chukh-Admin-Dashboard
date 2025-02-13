'use client';

import { useSearchParams } from 'next/navigation';
import type React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useFetchFoods } from 'src/app/(dashboard)/fetchfoods';
import { useFetchOrders } from 'src/app/(dashboard)/fetchOrders';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded shadow-lg border">
        <p className="font-bold">{payload[0].name}</p>
        <p className="text-gray-600">{payload[0].payload.description}</p>
        <p className="text-blue-600">Sales: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export const PieChart: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const products = useFetchFoods(searchQuery);
  const orders = useFetchOrders(searchQuery);

  // Process orders to group by category
  const processedCategoryData = orders.reduce((acc: { name: string; value: number; description: string }[], order: any) => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach((item: any) => {
        const product = products.find(p => p.name === item.name);
        if (product) {
          const existingCategory = acc.find(c => c.name === product.category);
          if (existingCategory) {
            existingCategory.value += item.quantity;
          } else {
            acc.push({
              name: product.category,
              value: item.quantity,
              description: `Total orders in ${product.category} category`
            });
          }
        }
      });
    }
    return acc;
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Orders Distribution by Category
        </h3>
        <p className="text-sm text-gray-500">
          Breakdown of orders across different food categories
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={processedCategoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {processedCategoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
