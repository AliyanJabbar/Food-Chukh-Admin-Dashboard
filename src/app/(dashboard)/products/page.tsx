'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../../components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { ProductsTable } from './products-table';
import { useFetchFoods } from '../fetchfoods';
import { useSearchParams } from 'next/navigation';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../../components/ui/dropdown-menu';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const tabValue = searchParams.get('tab') || 'all';
  const products = useFetchFoods(searchQuery);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      products.map((product) => ({
        Name: product.name,
        Price: product.price,
        Category: product.category,
        Available: product.availiable ? 'Yes' : 'No',
        Description: product.description
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'food-chukh-products.xlsx');
  };

  const exportToPNG = async () => {
    const element = document.getElementById('products-table');
    if (element) {
      const canvas = await html2canvas(element);
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'food-chukh-products.png');
        }
      });
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableData = products.map((product) => [
      product.name,
      product.price,
      product.category,
      product.availiable ? 'Yes' : 'No',
      product.description
    ]);

    autoTable(doc, {
      head: [['Name', 'Price', 'Category', 'Available', 'Description']],
      body: tableData,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save('food-chukh-products.pdf');
  };

  const getFilteredProducts = () => {
    switch (tabValue) {
      case 'active':
        return products.filter((product) => product.availiable === true);
      case 'draft':
        return products.filter((product) => product.availiable === false);
      default:
        return products;
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <Tabs defaultValue={tabValue}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger
            value="all"
            onClick={() => window.history.pushState(null, '', '?tab=all')}
          >
            All ({products.length})
          </TabsTrigger>
          <TabsTrigger
            value="active"
            onClick={() => window.history.pushState(null, '', '?tab=active')}
            className="text-nowrap"
          >
            In Stock ({products.filter((p) => p.availiable).length})
          </TabsTrigger>
          <TabsTrigger
            value="draft"
            onClick={() => window.history.pushState(null, '', '?tab=draft')}
            className="text-nowrap"
          >
            Out Of Stock ({products.filter((p) => !p.availiable).length})
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportToExcel}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPNG}>
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          searchQuery={searchQuery}
        />
      </TabsContent>
      <TabsContent value="active">
        <ProductsTable
          products={filteredProducts}
          offset={10}
          searchQuery={searchQuery}
        />
      </TabsContent>
      <TabsContent value="draft">
        <ProductsTable
          products={filteredProducts}
          offset={10}
          searchQuery={searchQuery}
        />
      </TabsContent>
    </Tabs>
  );
}
