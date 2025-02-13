'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../../components/ui/card';
import { useFetchOrders } from '../fetchOrders';
import { useSearchParams } from 'next/navigation';
import OrderTable from './orderTable';

export default function CustomersPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const orders = useFetchOrders(searchQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          View all orders and their buyers with details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OrderTable orders={orders} searchQuery={searchQuery} />
      </CardContent>
    </Card>
  );
}
