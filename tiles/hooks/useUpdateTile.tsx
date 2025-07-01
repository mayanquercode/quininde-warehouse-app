import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TileFormData } from "../entities";
import { fetchUpdateTile } from '../api/tileService';
import { tileKeys } from "../libs/tanstack";

export default function useUpdateTile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TileFormData) => fetchUpdateTile(data.code, data),
    onSuccess: () => {
      console.log('Mutación exitosa. Invalidando queries de "tiles"...');
      return queryClient.invalidateQueries({ queryKey: tileKeys.lists() });
    },
    onError: (error) => {
      console.error("Error al actualizar:", error);
    }
  });
}
