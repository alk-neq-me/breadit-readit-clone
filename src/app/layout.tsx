import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
  icons: {
    icon: "/favicon.ico"
  }
}

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode
  authModel: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children, authModel } = props;

  return (
    <html lang='en' className={cn(
      "bg-white text-slate-900 antialiased light",
      inter.className
    )}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        {/* @ts-expect-error server component */}
        <Navbar />

        {authModel}

        <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
