import { useQuery } from "@tanstack/react-query";
import { fetchTileByCode } from '../api/tileService';

export default function useGetTile(code: string) {

  return useQuery({
    queryKey: ['tiles', code],
    queryFn: () => fetchTileByCode(code),
  });
}