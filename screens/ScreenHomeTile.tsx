import DataTableTile from "@/components/DataTableTile";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

function ScreenHomeTile() {


  return (
    <View style={s.screen}>

      <DataTableTile />

      <FAB
        icon="plus"
        style={s.fab}
        onPress={() => router.push('/new_tile')}
      />
      <StatusBar style='light' />
    </View>
  )
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fffbff',
    paddingTop: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ScreenHomeTile;