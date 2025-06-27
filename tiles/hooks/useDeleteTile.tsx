import { useMutation, useQueryClient } from "@tanstack/react-query";
import TileLocalRepository from "../TileLocalRepository";

export default function useDeleteTile() {
  const queryClient = useQueryClient();
  const repository = new TileLocalRepository();

  return useMutation({
    mutationFn: (code: string) => repository.deleteTile(code),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tiles'] });
    },
  });
}