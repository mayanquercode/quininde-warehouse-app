import { useMutation, useQueryClient } from "@tanstack/react-query";
import TileLocalRepository from "../TileLocalRepository";
import { TileFormData } from "../entities";

export default function useUpdateTile() {
  const queryClient = useQueryClient();
  const repository = new TileLocalRepository();

  return useMutation({
    mutationFn: (data: TileFormData) => repository.updateTile(data.code, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tiles'] });
    },
  });
}