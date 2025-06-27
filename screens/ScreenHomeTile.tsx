// screens/ScreenHomeTile.tsx
import DataTableTile from "@/components/DataTableTile";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { FAB, TextInput, MD3Colors } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import useGetAllTiles from "@/tiles/hooks/useGetAllTiles";

function ScreenHomeTile() {
  const [search, setSearch] = useState("");
  const { data: allTiles, isLoading } = useGetAllTiles();

  // Función de filtrado memoizada
  const filteredTiles = useMemo(() => {
    if (!allTiles) return [];
    if (!search.trim()) return allTiles;

    const searchTerm = search.toLowerCase();
    return allTiles.filter(tile => 
      tile.name.toLowerCase().includes(searchTerm) ||
      (tile.code && tile.code.toLowerCase().includes(searchTerm))
    );
  }, [allTiles, search]);

  const handleClearSearch = () => {
    setSearch("");
  };

  return (
    <View style={s.screen}>
      <Stack.Screen options={{ title: "Cerámicas" }} />
      
      {/* Barra de búsqueda */}
      <View style={s.searchContainer}>
        <TextInput
          placeholder="Buscar por nombre o código..."
          value={search}
          onChangeText={setSearch}
          mode="outlined"
          style={s.searchInput}
          left={<TextInput.Icon icon="magnify" />}
          right={
            search ? (
              <TextInput.Icon 
                icon="close" 
                onPress={handleClearSearch} 
              />
            ) : null
          }
        />
      </View>

      {/* Tabla de datos */}
      {isLoading ? (
        <View style={s.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <DataTableTile data={filteredTiles} />
      )}

      {/* Botón flotante */}
      <FAB
        icon="plus"
        style={s.fab}
        onPress={() => router.push('/new_tile')}
      />
      <StatusBar style="light" />
    </View>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fffbff',
    paddingTop: 20,
  },
  searchContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  searchInput: {
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: MD3Colors.primary40,
  },
});

export default ScreenHomeTile;
