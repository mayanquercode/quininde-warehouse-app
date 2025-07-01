import { useQuery } from "@tanstack/react-query";
import { fetchTiles } from "../api/tileService";
import { tileKeys } from "../libs/tanstack";


export function useTilesQuery(page: number, searchTerm = '') {
  const queryKey = tileKeys.list(page, searchTerm);

  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchTiles({ page, searchTerm }),

    // Simplificación: 'refetchOnMount: "always"' ya implica que los datos se consideran obsoletos al montar.
    // 'staleTime: 0' es el valor por defecto, por lo que no es necesario especificarlo si quieres este comportamiento.
    // Mantenemos 'refetchOnMount' para ser explícitos.
    refetchOnMount: 'always',

    retry: (failureCount, error: any) => {
      // Esta lógica está bien. No reintenta en errores específicos de la API.
      return error?.code !== 'PGRST103' && failureCount < 3;
    },

    // Nueva recomendación: Mantener los datos de la página anterior mientras se carga la nueva.
    // Esto mejora mucho la experiencia de usuario en paginaciones.
    placeholderData: (previousData) => previousData,
  });
}