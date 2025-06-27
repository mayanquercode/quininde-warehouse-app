export interface Tile {
  code: string;
  name: string;
  box: string;
  piece: string;
  pieces: string;
}

export interface TileRepository {
  getAllTiles: () => Promise<Tile[]>;
  getTileByCode: (code: string) => Promise<Tile | null>;
  createTile: (data: TileFormData) => Promise<Tile>;
  updateTile: (code: string, data: TileFormData) => Promise<Tile>;
  deleteTile: (code: string) => Promise<void>;
}

export interface TileFormData {
  code: string;
  name: string;
  box: string;
  piece: string;
  pieces: string;
}
