import { useQuery } from "@tanstack/react-query";
import TileLocalRepository from "../TileLocalRepository";

export default function useGetAllTiles() {
  const repository = new TileLocalRepository();

  return useQuery({
    queryKey: ['tiles'],
    queryFn: () => repository.getAllTiles(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    //cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}