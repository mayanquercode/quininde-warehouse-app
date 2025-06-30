import { useQuery } from "@tanstack/react-query";
import { fetchTiles } from "../api/tileService";

export function useTilesQuery(page: number, searchTerm = '') {
  return useQuery({
    queryKey: ['tiles', page, searchTerm],
    queryFn: () => fetchTiles({ page, searchTerm }),
    staleTime: 0,
    refetchOnMount: 'always',
    retry: (failureCount, error: any) => {
      // No reintentar si el error es de rango no válido
      return error.code !== 'PGRST103' && failureCount < 3;
    }
  });
}