import { client } from '../../sanity/lib/client';
import { useEffect, useState } from 'react';

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
}

export interface Customer {
  _id: string;
  orderId: string;
  customerDetails: CustomerDetails;
}

export function useCustomers(searchQuery: string) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "order"] {
          _id,
          orderId,
          customerDetails {
            firstName,
            lastName,
            email,
            phone,
            address,
            zipCode
          }
        }`;
        const data = await client.fetch(query);
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
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

  return customers;
}
