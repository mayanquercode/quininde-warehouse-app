import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tileRepository } from "../dependencies";

export default function useDeleteTile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => tileRepository.deleteTile(code),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tiles'] });
    },
  });
}