'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../../components/ui/card';
import CustomerTable from './customerTable';
import { useSearchParams } from 'next/navigation';
import { useCustomers } from '../fetchCustomers';

export default function CustomersPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const customers = useCustomers(searchQuery);
  const uniqueCustomers = customers.filter(
    (customer, index, self) =>
      index ===
      self.findIndex(
        (c) => c.customerDetails.email === customer.customerDetails.email
      )
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Custome<span className="text-orangeLike">rs</span>
        </CardTitle>
        <CardDescription>
          View all unique customers and their order history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomerTable
          customers={uniqueCustomers}
          searchQuery={searchQuery}
          allOrders={customers}
        />
      </CardContent>
    </Card>
  );
}
