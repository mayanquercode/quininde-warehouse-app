import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteTile } from '../api/tileService';

export default function useDeleteTile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => fetchDeleteTile(code),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tiles'] });
    },
  });
}