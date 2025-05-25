import {ReactNode} from 'react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient()
export const withQuery = (component: () => ReactNode) => () => (
  <QueryClientProvider client={queryClient}>
    {component()}
  </QueryClientProvider>
)