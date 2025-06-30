import { supabase } from "../TileSupabaseRepository";
import { ITEMS_PER_PAGE } from "../constants";
import { Tile, TileFormData } from "../entities";

type FetchTilesOptions = {
  page: number;
  searchTerm?: string;
};

export async function fetchTiles(options: FetchTilesOptions) {
  const { page, searchTerm } = options;
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let query = supabase.from("tile").select("*", { count: "exact" });

  if (searchTerm && searchTerm.trim().length > 0) {
    query = query.or(`name.ilike.%${searchTerm}%,code.ilike.%${searchTerm}%`);
  }

  // Primero obtenemos el conteo total
  const countQuery = await query;
  const totalCount = countQuery.count || 0;

  // Verificamos si el rango solicitado es válido
  if (from >= totalCount) {
    return {
      data: [],
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
    };
  }

  // Si el rango es válido, ejecutamos la consulta paginada
  const { data, error } = await query.range(from, Math.min(to, totalCount - 1)); // Aseguramos no exceder el total

  if (error) {
    console.error("Error fetching tiles:", error);
    throw error;
  }

  return {
    data: data as Tile[],
    totalCount,
    page,
    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
  };
}

export async function fetchTileByCode(code: string) {
  const { data, error } = await supabase
    .from("tile")
    .select("*")
    .eq("code", code)
    .single();

  if (error) {
    console.error("Error fetching tile by code:", error);
    throw error;
  }

  return data as Tile;
}

export async function fetchCreateTile(data: TileFormData): Promise<boolean> {
  const newTile = {
    code: data.code.trim(),
    name: data.name.trim(),
    box: parseFloat(data.box.trim()),
    piece: parseFloat(data.piece.trim()),
    pieces: parseInt(data.pieces.trim(), 10),
  };

  const { data: insertedArray, error } = await supabase
    .from("tile")
    .insert(newTile)
    .select();

  if (error) {
    console.error("Error creating tile:", error);
    throw error;
  }

  return true;
}

export async function fetchUpdateTile(
  code: string,
  data: TileFormData
): Promise<boolean> {
  const updatedFields = {
    name: data.name.trim(),
    box: parseFloat(data.box.trim()),
    piece: parseFloat(data.piece.trim()),
    pieces: parseInt(data.pieces.trim(), 10),
  };

  const { error } = await supabase
    .from("tile")
    .update(updatedFields)
    .eq("code", code);

  if (error) {
    console.error(`Error updating tile with code ${code}:`, error);
    throw error;
  }

  return true;
}

export async function fetchDeleteTile(code: string): Promise<boolean> {
  const { error } = await supabase.from("tile").delete().eq("code", code);

  if (error) {
    console.error(`Error deleting tile with code ${code}:`, error);
    throw error;
  }

  return true;
}
