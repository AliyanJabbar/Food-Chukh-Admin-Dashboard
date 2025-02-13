'use client';

import { useTransition, useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../../components/ui/input';
import { Spinner } from '../../components/icons';
import { Search } from 'lucide-react';

export function SearchInput() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const pathname = usePathname();

  useEffect(() => {
    setSearchValue(searchParams.get('q') || '');
  }, [searchParams]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();

    const value = e.target.value;
    setSearchValue(value);

    const params = new URLSearchParams();
    if (value) {
      params.set('q', value);
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div
      className="relative ml-auto flex-1 md:grow-0"
      onClick={(e) => e.stopPropagation()}
    >
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder={
          pathname === '/products'
            ? 'Search By Name or Category...'
            : pathname === '/customers'
              ? 'Search By Customer Name...'
              : pathname === '/orders'
                ? 'Search By Id...'
                : 'Search...'
        }
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        value={searchValue}
        onChange={handleSearch}
        onClick={(e) => e.stopPropagation()}
      />
      {isPending && <Spinner />}
    </div>
  );
}
