import { useQuery } from "@tanstack/react-query";
import { tileRepository } from "../dependencies";

export default function useGetAllTiles() {

  return useQuery({
    queryKey: ['tiles'],
    queryFn: () => tileRepository.getAllTiles(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}