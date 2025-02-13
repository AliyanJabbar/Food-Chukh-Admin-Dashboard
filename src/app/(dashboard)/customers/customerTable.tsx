'use client';

import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Customer } from '../fetchCustomers';

interface CustomerTableProps {
  customers: Customer[];
  searchQuery?: string;
  allOrders?: Customer[];
}
export default function CustomerTable({
  customers,
  searchQuery,
  allOrders = customers 

}: CustomerTableProps) {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleRowExpansion = (email: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [email]: !prev[email]
    }));
  };

  const getCustomerOrders = (email: string) => {
    return allOrders.filter((order) => order.customerDetails.email === email);
  };

  const filteredCustomers = searchQuery
    ? customers.filter(
        (customer) =>
          customer.customerDetails.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          customer.customerDetails.lastName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          customer.customerDetails.email
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          customer.customerDetails.phone.includes(searchQuery)
      )
    : customers;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <table className="min-w-full divide-y divide-outline">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-5 text-left text-sm font-semibold text-txtGray uppercase tracking-wider">
              Expand
            </th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-txtGray uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-txtGray uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-txtGray uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-txtGray uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-txtGray uppercase tracking-wider">
              Zip Code
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-outline">
          {filteredCustomers.map((customer, ind: number) => (
            <React.Fragment key={ind}>
              <tr className="hover:bg-orange-50 transition-all duration-300">
                <td className="px-6 py-5">
                  <button
                    onClick={() =>
                      toggleRowExpansion(customer.customerDetails.email)
                    }
                    className="text-orangeLike hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-orange-100"
                  >
                    {expandedRows[customer.customerDetails.email] ? (
                      <FiChevronUp className="w-6 h-6" />
                    ) : (
                      <FiChevronDown className="w-6 h-6" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-5 text-base text-txtBlack font-medium">
                  {`${customer.customerDetails.firstName} ${customer.customerDetails.lastName}`}
                </td>
                <td className="px-6 py-5 text-base text-txtBlack">
                  {customer.customerDetails.email}
                </td>
                <td className="px-6 py-5 text-base text-txtBlack">
                  {customer.customerDetails.phone}
                </td>
                <td className="px-6 py-5 text-base text-txtBlack">
                  {customer.customerDetails.address}
                </td>
                <td className="px-6 py-5 text-base text-txtBlack">
                  {customer.customerDetails.zipCode}
                </td>
              </tr>
              {expandedRows[customer.customerDetails.email] && (
                <tr className="bg-orange-50/30">
                  <td colSpan={6} className="px-6 py-4">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">
                        Order <span className="text-orangeLike">History</span>
                      </h4>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        {getCustomerOrders(customer.customerDetails.email).map(
                          (order, index) => (
                            <div
                              key={index}
                              className="py-2 flex justify-between items-center"
                            >
                              <span className="font-medium">
                                Order {index + 1} ID: {order.orderId}
                              </span>
                            </div>
                          )
                        )}
                        <div className="mt-2 text-sm text-gray-600">
                          Total Orders:{' '}
                          {
                            getCustomerOrders(customer.customerDetails.email)
                              .length
                          }
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
