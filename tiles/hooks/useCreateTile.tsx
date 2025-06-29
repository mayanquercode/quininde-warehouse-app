import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TileFormData } from '../entities';
import { tileRepository } from '../dependencies';

export default function useCreateTile() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TileFormData) => tileRepository.createTile(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tiles'] })
    },
  });
}