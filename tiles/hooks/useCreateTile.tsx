import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TileFormData } from '../entities';
import TileLocalRepository from '../TileLocalRepository';

const repository = new TileLocalRepository();

export default function useCreateTile() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TileFormData) => repository.createTile(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tiles'] })
    },
  });
}