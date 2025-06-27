import { useQuery } from "@tanstack/react-query";
import TileLocalRepository from "../TileLocalRepository";

export default function useGetTile(code: string) {
  const repository = new TileLocalRepository();

  return useQuery({
    queryKey: ['tiles', code],
    queryFn: () => repository.getTileByCode(code),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}