import { AuthProvider } from './authProvider';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Admin Dashboard Food Chukh',
  description:
    'A user admin dashboard configured with Next.js, Sanity.io, kindeAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="flex min-h-screen w-full flex-col">{children}</body>
        <Analytics />
      </html>
    </AuthProvider>
  );
}
