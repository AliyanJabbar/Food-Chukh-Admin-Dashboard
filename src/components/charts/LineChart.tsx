'use client';

import type React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 200 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 }
];

export const LineChart: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Revenue Trends</h2>
      <p className="text-sm text-gray-500 mb-4">Monthly revenue performance</p>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
