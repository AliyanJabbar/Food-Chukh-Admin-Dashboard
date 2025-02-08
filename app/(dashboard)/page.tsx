// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { File, PlusCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { ProductsTable } from './products-table';
// import { getProducts } from '@/lib/db';

// export default async function ProductsPage(
//   props: {
//     searchParams: Promise<{ q: string; offset: string }>;
//   }
// ) {
//   const searchParams = await props.searchParams;
//   const search = searchParams.q ?? '';
//   const offset = searchParams.offset ?? 0;
//   const { products, newOffset, totalProducts } = await getProducts(
//     search,
//     Number(offset)
//   );

//   return (
//     <Tabs defaultValue="all">
//       <div className="flex items-center">
//         <TabsList>
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="active">Active</TabsTrigger>
//           <TabsTrigger value="draft">Draft</TabsTrigger>
//           <TabsTrigger value="archived" className="hidden sm:flex">
//             Archived
//           </TabsTrigger>
//         </TabsList>
//         <div className="ml-auto flex items-center gap-2">
//           <Button size="sm" variant="outline" className="h-8 gap-1">
//             <File className="h-3.5 w-3.5" />
//             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//               Export
//             </span>
//           </Button>
//           <Button size="sm" className="h-8 gap-1">
//             <PlusCircle className="h-3.5 w-3.5" />
//             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//               Add Product
//             </span>
//           </Button>
//         </div>
//       </div>
//       <TabsContent value="all">
//         <ProductsTable
//           products={products}
//           offset={newOffset ?? 0}
//           totalProducts={totalProducts}
//         />
//       </TabsContent>
//     </Tabs>
//   );
// }



// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { File, PlusCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { ProductsTable } from './products-table';
// import { client } from '../../sanity/lib/client';

// async function getProducts(search: string, offset: number) {
//   const query = `*[_type == "product" ${
//     search ? `&& name match "*${search}*"` : ''
//   }] {
//     _id,
//     name,
//     status,
//     price,
//     stock,
//     availableAt,
//     image
//   } | order(_createdAt desc) [${offset}...${offset + 10}]`;

//   const countQuery = `count(*[_type == "product" ${
//     search ? `&& name match "*${search}*"` : ''
//   }])`;

//   const products = await client.fetch(query);
//   const totalProducts = await client.fetch(countQuery);

//   return {
//     products,
//     newOffset: offset + 10,
//     totalProducts
//   };
// }

// export default async function ProductsPage(
//   props: {
//     searchParams: Promise<{ q: string; offset: string }>;
//   }
// ) {
//   const searchParams = await props.searchParams;
//   const search = searchParams.q ?? '';
//   const offset = searchParams.offset ?? 0;
//   const { products, newOffset, totalProducts } = await getProducts(
//     search,
//     Number(offset)
//   );

//   return (
//     <Tabs defaultValue="all">
//       <div className="flex items-center">
//         <TabsList>
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="active">Active</TabsTrigger>
//           <TabsTrigger value="draft">Draft</TabsTrigger>
//           <TabsTrigger value="archived" className="hidden sm:flex">
//             Archived
//           </TabsTrigger>
//         </TabsList>
//         <div className="ml-auto flex items-center gap-2">
//           <Button size="sm" variant="outline" className="h-8 gap-1">
//             <File className="h-3.5 w-3.5" />
//             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//               Export
//             </span>
//           </Button>
//           <Button size="sm" className="h-8 gap-1">
//             <PlusCircle className="h-3.5 w-3.5" />
//             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//               Add Product
//             </span>
//           </Button>
//         </div>
//       </div>
//       <TabsContent value="all">
//         <ProductsTable
//           products={products}
//           offset={newOffset ?? 0}
//           totalProducts={totalProducts}
//         />
//       </TabsContent>
//     </Tabs>
//   );
// }
















'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { useFetchFoods } from './fetchfoods';

export default function ProductsPage() {
  const products = useFetchFoods();
  const totalProducts = products.length;

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <ProductsTable
          products={products}
          offset={10}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}