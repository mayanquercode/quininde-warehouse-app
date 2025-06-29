import { useQuery } from "@tanstack/react-query";
import { tileRepository } from "../dependencies";

export default function useGetTile(code: string) {

  return useQuery({
    queryKey: ['tiles', code],
    queryFn: () => tileRepository.getTileByCode(code),
  });
}