import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TileFormData } from "../entities";
import { fetchUpdateTile } from '../api/tileService';

export default function useUpdateTile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TileFormData) => fetchUpdateTile(data.code, data),

    // Se ejecuta inmediatamente antes de la mutación
    onMutate: async (updatedTile) => {
      // 1. Cancelar cualquier refetch en curso para evitar sobreescribir nuestro cambio optimista
      await queryClient.cancelQueries({ queryKey: ['tiles'] });

      // 2. Guardar el estado anterior de los datos
      const previousTilesData = queryClient.getQueryData(['tiles']); // Podrías ser más específico con la página

      // 3. Actualizar el caché de forma optimista
      // Actualizamos el detalle del tile específico
      queryClient.setQueryData(['tiles', updatedTile.code], updatedTile);

      // (Opcional pero recomendado) Actualizar la lista de tiles
      queryClient.setQueryData(['tiles'], (oldData: any) => {
        // Lógica para encontrar y reemplazar el tile en la lista paginada
        // Esto puede ser complejo, por eso a veces solo se invalida
        return oldData;
      });

      // 4. Devolver un objeto de contexto con los datos anteriores
      return { previousTilesData };
    },

    // Si la mutación falla, usamos el contexto para revertir el cambio
    onError: (err, newTile, context) => {
      if (context?.previousTilesData) {
        queryClient.setQueryData(['tiles'], context.previousTilesData);
      }
    },

    // Siempre se ejecuta al final, ya sea con éxito o error
    onSettled: () => {
      // 5. Invalidar la consulta para asegurar que el cliente y el servidor estén sincronizados
      queryClient.invalidateQueries({ queryKey: ['tiles'] });
    },
  });
}