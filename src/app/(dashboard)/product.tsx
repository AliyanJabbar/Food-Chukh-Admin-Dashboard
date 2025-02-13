import Image from 'next/image';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '../../components/ui/table';
import { urlFor } from '../../sanity/lib/image';
import { client } from '../../sanity/lib/client';

interface Product {
  _id: string;
  name: string;
  rating: number;
  price: number;
  stock: number;
  availableAt: string;
  image: any;
  reviews?: string[];
  category?: string;
}

export function Product({ product }: { product: Product }) {
  // const handleDelete = async () => {
  //   try {
  //     await client.delete(product._id);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //   }
  // };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height={65}
          src={urlFor(product.image).url()}
          width={65}
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.rating} ⭐
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">${product.price}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.reviews?.length || 0}
      </TableCell>
      <TableCell className="hidden md:table-cell">{product.category}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
