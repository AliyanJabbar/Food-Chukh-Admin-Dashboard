'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '../../../components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../../components/ui/card';
import { Product } from '../product';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Data } from '../../types';
import { useState } from 'react';

export function ProductsTable({
  products,
  offset,
  searchQuery
}: {
  products: Data[];
  offset: number;
  searchQuery?: string;
}) {
  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.category &&
            product.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : products;
  let router = useRouter();
  const pathname = usePathname();
  let productsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the slice indices
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathname}?offset=${(currentPage - 2) * productsPerPage}`, {
        scroll: false
      });
    }
  }

  function nextPage() {
    if (endIndex < filteredProducts.length) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathname}?offset=${currentPage * productsPerPage}`, {
        scroll: false
      });
    }
  }

  return (
    <Card id="products-table">
      <CardHeader>
        <CardTitle>
          Produc<span className="text-orangeLike">ts</span>
        </CardTitle>
        <CardDescription>
          Manage your food items and view their performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                Image
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Reviews</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.slice(startIndex, endIndex).map((product) => (
              <Product
                key={product.id}
                product={{
                  _id: product.id.toString(),
                  name: product.name,
                  rating: product.rating,
                  price: product.price,
                  stock: product.inventory,
                  availableAt: new Date().toISOString(),
                  image: product.image,
                  reviews: product.reviews,
                  category: product.category
                }}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}
            </strong>{' '}
            of <strong>{filteredProducts.length}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={endIndex >= filteredProducts.length}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
