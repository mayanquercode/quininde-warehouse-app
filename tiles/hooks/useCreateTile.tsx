import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TileFormData } from '../entities';
import { fetchCreateTile } from '../api/tileService';

export default function useCreateTile() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TileFormData) => fetchCreateTile(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tiles'] })
    },
  });
}