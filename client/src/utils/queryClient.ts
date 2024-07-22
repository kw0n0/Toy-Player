import { QueryClient } from '@tanstack/react-query';

class GlobalQueryClient {
  private static instance: QueryClient | null = null;

  public static getInstance(): QueryClient {
    if (!GlobalQueryClient.instance) {
      GlobalQueryClient.instance = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5000,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    }
    return GlobalQueryClient.instance;
  }
}

export const getQueryClient = (): QueryClient => {
  return GlobalQueryClient.getInstance();
};
