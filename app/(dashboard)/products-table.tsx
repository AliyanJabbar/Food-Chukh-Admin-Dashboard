// 'use client';

// import {
//   TableHead,
//   TableRow,
//   TableHeader,
//   TableBody,
//   Table
// } from '@/components/ui/table';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card';
// import { Product } from './product';
// import { useRouter } from 'next/navigation';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useFetchFoods } from './fetchfoods';

// export function ProductsTable({
//   offset,
//   totalProducts
// }: {
//   offset: number;
//   totalProducts: number;
// }) {
//   let router = useRouter();
//   let productsPerPage = 5;

//   function prevPage() {
//     router.back();
//   }

//   function nextPage() {
//     router.push(`/?offset=${offset}`, { scroll: false });
//   }

//   const products = useFetchFoods();

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Products</CardTitle>
//         <CardDescription>
//           Manage your products and view their sales performance.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="hidden w-[100px] sm:table-cell">
//                 <span className="sr-only">Image</span>
//               </TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="hidden md:table-cell">Price</TableHead>
//               <TableHead className="hidden md:table-cell">
//                 Total Sales
//               </TableHead>
//               <TableHead className="hidden md:table-cell">Created at</TableHead>
//               <TableHead>
//                 <span className="sr-only">Actions</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {products.map((product) => (
//               <Product key={product.id} product={product} />
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//       <CardFooter>
//         <form className="flex items-center w-full justify-between">
//           <div className="text-xs text-muted-foreground">
//             Showing{' '}
//             <strong>
//               {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
//             </strong>{' '}
//             of <strong>{totalProducts}</strong> products
//           </div>
//           <div className="flex">
//             <Button
//               formAction={prevPage}
//               variant="ghost"
//               size="sm"
//               type="submit"
//               disabled={offset === productsPerPage}
//             >
//               <ChevronLeft className="mr-2 h-4 w-4" />
//               Prev
//             </Button>
//             <Button
//               formAction={nextPage}
//               variant="ghost"
//               size="sm"
//               type="submit"
//               disabled={offset + productsPerPage > totalProducts}
//             >
//               Next
//               <ChevronRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         </form>
//       </CardFooter>
//     </Card>
//   );
// }

// export function ProductsTable({
//   offset,
//   totalProducts
// }: {
//   offset: number;
//   totalProducts: number;
// }) {
//   let router = useRouter();
//   let productsPerPage = 10;
//   const products: Data[] = useFetchFoods();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   function prevPage() {
//     router.back();
//   }

//   function nextPage() {
//     router.push(`/?offset=${offset}`, { scroll: false });
//   }

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Products</CardTitle>
//         <CardDescription>
//           Manage your food items and view their performance.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Table>

//           <TableBody>
//             {mounted &&
//               products
//                 .slice(offset - productsPerPage, offset)
//                 .map((product) => (
//                   <Product
//                     key={product.id}
//                     product={{
//                       _id: product.id.toString(),
//                       name: product.name,
//                       rating: product.rating,
//                       price: product.price,
//                       stock: product.inventory,
//                       availableAt: new Date().toISOString(),
//                       image: product.image,
//                       reviews: product.reviews,
//                       category: product.category
//                     }}
//                   />
//                 ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//       <CardFooter>
//         <form className="flex items-center w-full justify-between">
//           <div className="text-xs text-muted-foreground">
//             Showing{' '}
//             <strong>
//               {Math.max(
//                 0,
//                 Math.min(offset - productsPerPage, totalProducts) + 1
//               )}
//               -{offset}
//             </strong>{' '}
//             of <strong>{totalProducts}</strong> products
//           </div>
//           <div className="flex">
//             <Button
//               formAction={prevPage}
//               variant="ghost"
//               size="sm"
//               type="submit"
//               disabled={offset === productsPerPage}
//             >
//               <ChevronLeft className="mr-2 h-4 w-4" />
//               Prev
//             </Button>
//             <Button
//               formAction={nextPage}
//               variant="ghost"
//               size="sm"
//               type="submit"
//               disabled={offset + productsPerPage > totalProducts}
//             >
//               Next
//               <ChevronRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         </form>
//       </CardFooter>
//     </Card>
//   );
// }

'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Product } from './product';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Data } from '../types';
import { useState } from 'react';

export function ProductsTable({
  products,
  offset,
  totalProducts
}: {
  products: Data[];
  offset: number;
  totalProducts: number;
}) {
  let router = useRouter();
  let productsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the correct slice indices
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  function prevPage() {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    router.back();
  }

  function nextPage() {
    setCurrentPage((prev) => prev + 1);
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
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
            {products.slice(startIndex, endIndex).map((product) => (
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
              {startIndex + 1}-{Math.min(endIndex, products.length)}
            </strong>{' '}
            of <strong>{products.length}</strong> products
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
              disabled={endIndex >= products.length}
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
