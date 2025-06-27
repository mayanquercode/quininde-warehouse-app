import { Tile, TileRepository } from "./entities";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TILE_STORAGE_KEY = "@tiles_data";

export interface TileFormData {
  code: string;
  name: string;
  box: string;
  piece: string;
  pieces: string;
}

export default class TileLocalRepository implements TileRepository {
  getAllTiles = async (): Promise<Tile[]> => {
    try {
      const data = await AsyncStorage.getItem(TILE_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error al obtener todas las baldosas:", error);
      return [];
    }
  };

  getTileByCode = async (code: string): Promise<Tile | null> => {
    try {
      const tiles = await this.getAllTiles();
      return tiles.find((tile) => tile.code === code) || null;
    } catch (error) {
      console.error(`Error buscando baldosa con código ${code}:`, error);
      return null;
    }
  };

  createTile = async (data: TileFormData): Promise<Tile> => {
    const newTile: Tile = {
      code: data.code.trim(), // El código viene del usuario
      name: data.name.trim(),
      box: data.box.trim(),
      piece: data.piece.trim(),
      pieces: data.pieces.trim(),
    };

    try {
      const tiles = await this.getAllTiles();
      tiles.push(newTile);
      await AsyncStorage.setItem(TILE_STORAGE_KEY, JSON.stringify(tiles));
      return newTile;
    } catch (error) {
      console.error("Error al crear la baldosa:", error);
      throw error;
    }
  };

  updateTile = async (code: string, data: TileFormData): Promise<Tile> => {
    try {
      const tiles = await this.getAllTiles();
      const index = tiles.findIndex((tile) => tile.code === code);

      if (index === -1) {
        throw new Error(`Baldosa con código ${code} no encontrada`);
      }

      const updatedTile = {
        ...tiles[index],
        ...data,
      };

      tiles[index] = updatedTile;

      await AsyncStorage.setItem(TILE_STORAGE_KEY, JSON.stringify(tiles));
      return updatedTile;
    } catch (error) {
      console.error(
        `Error al actualizar la baldosa con código ${code}:`,
        error
      );
      throw error;
    }
  };

  deleteTile = async (code: string): Promise<void> => {
    try {
      const tiles = await this.getAllTiles();
      const filteredTiles = tiles.filter((tile) => tile.code !== code);
      await AsyncStorage.setItem(
        TILE_STORAGE_KEY,
        JSON.stringify(filteredTiles)
      );
    } catch (error) {
      console.error(`Error al eliminar la baldosa con código ${code}:`, error);
      throw error;
    }
  };
}
