// Centraliza tus query keys
export const tileKeys = {
  all: ["tiles"] as const,
  lists: () => [...tileKeys.all, "list"] as const,
  list: (page: number, searchTerm: string) =>
    [...tileKeys.lists(), { page, searchTerm }] as const,
  details: () => [...tileKeys.all, "detail"] as const,
  detail: (code: string) => [...tileKeys.details(), code] as const,
};
