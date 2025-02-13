'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import getImageUrl from '../getImage';

interface OrderTableProps {
  orders:
    | {
        _id: string;
        orderId: string;
        customerDetails: {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          address: string;
          zipCode: string;
        };
        items: {
          name: string;
          price: number;
          quantity: number;
          image: string;
        }[];
        totalAmount: number;
        status: string;
      }[]
    | [];
  searchQuery: string;
}

export default function OrderTable({ orders, searchQuery }: OrderTableProps) {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleRowExpansion = (orderId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredOrders.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No orders found</div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <table className="min-w-full divide-y divide-outline">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 md:px-6 py-3 md:py-5 text-left text-xs md:text-sm font-semibold text-txtGray uppercase tracking-wider">
              Expand
            </th>
            <th className="px-3 md:px-6 py-3 md:py-5 text-left text-xs md:text-sm font-semibold text-txtGray uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-3 md:px-6 py-3 md:py-5 text-left text-xs md:text-sm font-semibold text-txtGray uppercase tracking-wider hidden md:table-cell">
              Customer
            </th>
            <th className="px-3 md:px-6 py-3 md:py-5 text-left text-xs md:text-sm font-semibold text-txtGray uppercase tracking-wider hidden lg:table-cell">
              Email
            </th>
            <th className="px-3 md:px-6 py-3 md:py-5 text-left text-xs md:text-sm font-semibold text-txtGray uppercase tracking-wider hidden lg:table-cell">
              Phone
            </th>
            <th className="px-3 md:px-6 py-3 md:py-5 text-left text-xs md:text-sm font-semibold text-txtGray uppercase tracking-wider">
              Total
            </th>
            <th className="px-3 md:px-6 py-3 md:py-5 text-left text-xs md:text-sm font-semibold text-txtGray uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-outline">
          {filteredOrders.map((order, ind: number) => (
            <React.Fragment key={ind}>
              <tr className="hover:bg-orange-50 transition-all duration-300">
                <td className="px-3 md:px-6 py-3 md:py-5">
                  <button
                    onClick={() => toggleRowExpansion(order.orderId)}
                    className="text-orangeLike hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-orange-100"
                  >
                    {expandedRows[order.orderId] ? (
                      <FiChevronUp className="w-4 h-4 md:w-6 md:h-6" />
                    ) : (
                      <FiChevronDown className="w-4 h-4 md:w-6 md:h-6" />
                    )}
                  </button>
                </td>
                <td className="px-3 md:px-6 py-3 md:py-5 text-sm md:text-base font-medium text-gray-900">
                  {order.orderId}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-5 text-sm md:text-base text-txtBlack font-medium hidden md:table-cell">
                  {`${order.customerDetails.firstName} ${order.customerDetails.lastName}`}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-5 text-sm md:text-base text-txtBlack hidden lg:table-cell">
                  {order.customerDetails.email}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-5 text-sm md:text-base text-txtBlack hidden lg:table-cell">
                  {order.customerDetails.phone}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-5 text-sm md:text-base font-medium text-gray-900">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-5">
                  <span
                    className={`px-2 md:px-4 py-1 md:py-2 inline-flex text-xs md:text-sm leading-5 font-semibold rounded-full
                      ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
              {expandedRows[order.orderId] && (
                <tr className="bg-orange-50/30">
                  <td colSpan={7} className="px-3 md:px-6 py-4 md:py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      <div className="space-y-3 md:space-y-4">
                        <h4 className="text-base md:text-lg font-semibold">
                          Customer{' '}
                          <span className="text-orangeLike">Details</span>
                        </h4>
                        <div className="shadow-sm hover:shadow-md transition bg-white p-3 md:p-4 rounded-lg">
                          <p className="text-sm md:text-base">
                            Address: {order.customerDetails.address}
                          </p>
                          <p className="text-sm md:text-base">
                            Zip Code: {order.customerDetails.zipCode}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <h4 className="text-base md:text-lg font-semibold">
                          Order <span className="text-orangeLike">Items</span>
                        </h4>
                        <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between py-2 text-sm md:text-base"
                            >
                              <div className="flex items-center gap-3">
                                <Image
                                  src={getImageUrl(item.image)}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                  className="rounded-md object-cover"
                                />
                                <span>{item.name}</span>
                              </div>
                              <span>Qty: {item.quantity}</span>
                              <span>${item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
