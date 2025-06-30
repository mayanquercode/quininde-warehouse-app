import { useRef, useState } from 'react';
import { Stack } from "expo-router";
import { StyleSheet, Text, View, TextInput as TextInputRef } from "react-native";
import { StatusBar } from "expo-status-bar";
import DataTableTile from "@/components/DataTableTile";
import { IconButton, TextInput } from 'react-native-paper';
import usePagination from '../hooks/usePagination';
import { useTilesQuery } from '../hooks/useTilesQuery';
import { ITEMS_PER_PAGE } from '../constants';



function ScreenHomeTiles() {
  const inputSearchRef = useRef<TextInputRef>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentPage, firstPage, goToPage, nextPage, prevPage } = usePagination();
  const { data, error, isLoading } = useTilesQuery(currentPage, searchTerm)
  // Calcular total de páginas
  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 0;

  // Input para buscar por nombre
  const handleClearSearch = () => {
    setSearchTerm('');
    inputSearchRef.current?.blur();

  }

  return (
    <View style={s.screen}>
      <Stack.Screen options={{ title: "Cerámicas" }} />

      {/* Barra de de buscada */}
      <View style={{ padding: 10, position: 'relative' }}>
        <TextInput
          ref={inputSearchRef}
          label={'Buscar'}
          mode='outlined'
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        {searchTerm.trim() !== '' && (
          <IconButton
            icon={'close'}
            style={{ position: 'absolute', top: 15, right: 10, zIndex: 10 }}
            onPress={handleClearSearch}
          />
        )}
      </View>

      {isLoading && <Text>Cargando...</Text>}
      {error && <Text>Error: {error.message}</Text>}

      {data?.data && (
        <>
          <DataTableTile data={data.data} />

          {/* Controles de paginación */}
          <View style={s.paginationContainer}>

            <IconButton icon={'skip-backward'}
              onPress={firstPage}
              disabled={currentPage === 1}

            />

            <IconButton icon={'skip-previous'}
              onPress={prevPage}
              disabled={currentPage === 1}

            />

            <Text style={s.pageText}>{currentPage} / {totalPages}</Text>


            <IconButton icon={'skip-next'}
              onPress={nextPage}
              disabled={currentPage === totalPages}
            />

            <IconButton icon={'skip-forward'}
              onPress={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            />


          </View>
        </>
      )}

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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fffbff',
    marginTop: 10,
    borderRadius: 8,
  },
  paginationButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageText: {
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
});

export default ScreenHomeTiles;