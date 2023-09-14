"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: React.ReactNode
}

function Providers(props: ProviderProps) {
  const { children } = props;
  const client = new QueryClient()

  return <QueryClientProvider client={client}>
    <SessionProvider>
      {children}
    </SessionProvider>
  </QueryClientProvider>
}

export default Providers
