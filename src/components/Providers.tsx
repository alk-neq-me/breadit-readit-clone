"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProviderProps {
  children: React.ReactNode
}

function Providers(props: ProviderProps) {
  const { children } = props;
  const client = new QueryClient()

  return <QueryClientProvider client={client}>
    {children}
  </QueryClientProvider>
}

export default Providers
