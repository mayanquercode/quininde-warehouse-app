import { Tile, TileFormData, TileRepository } from "./entities";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string
);

export default class TileSupabaseRepository implements TileRepository {
  async getAllTiles(): Promise<Tile[]> {
    const { data, error } = await supabase.from("tile").select("*");

    if (error) {
      console.error("Error fetching tiles:", error);
      return [];
    }

    return data || [];
  }

  async getTileByCode(code: string): Promise<Tile | null> {
    const { data, error } = await supabase
      .from("tile")
      .select("*")
      .eq("code", code)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Row not found
        return null;
      }
      console.error(`Error fetching tile with code ${code}:`, error);
      return null;
    }

    console.log("Fetched tile data by code:", data);

    return data;
  }

  async createTile(data: TileFormData): Promise<Tile> {
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

    return insertedArray?.[0];
  }

  async updateTile(code: string, data: TileFormData): Promise<Tile> {
    const updatedFields = {
      name: data.name.trim(),
      box: parseFloat(data.box.trim()),
      piece: parseFloat(data.piece.trim()),
      pieces: parseInt(data.pieces.trim(), 10),
    };

    const { data: updated, error } = await supabase
      .from("tile")
      .update(updatedFields)
      .eq("code", code)
      .select()
      .single();

    if (error) {
      console.error(`Error updating tile with code ${code}:`, error);
      throw error;
    }

    return updated;
  }

  async deleteTile(code: string): Promise<void> {
    const { error } = await supabase.from("tile").delete().eq("code", code);

    if (error) {
      console.error(`Error deleting tile with code ${code}:`, error);
      throw error;
    }
  }
}
