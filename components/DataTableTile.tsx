import { Tile } from "@/tiles/entities";
import useGetAllTiles from "@/tiles/hooks/useGetAllTiles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { MD3Colors } from "react-native-paper";

type ItemProps = {
  tile: Tile
}

const { width: screenWidth } = Dimensions.get('screen');

const Item = ({ tile }: ItemProps) => {

  const handleNavigateEdit = () => {
    router.push(`/edit_tile?code=${tile.code}`);
  }

  return (
    <View style={{ height: 50, width: screenWidth, flexDirection: 'row' }}>
      <TouchableOpacity style={{ width: 40, height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={handleNavigateEdit}>
        <MaterialCommunityIcons name="book-edit" size={25} color={MD3Colors.neutral20} />
      </TouchableOpacity>
      <View style={{ height: 50, paddingTop: 10, paddingRight: 5 }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{
          fontSize: 12, marginBottom: 3, width: screenWidth - 50, color: MD3Colors.neutral20
        }}>{tile.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: MD3Colors.neutral20 }}>{tile.box}m² -- </Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: MD3Colors.neutral20 }}>{tile.piece}m² -- </Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: MD3Colors.neutral20 }}>#{tile.pieces}</Text>
        </View>
      </View>
    </View>

  )
}

function DataTableTile() {

  const { data } = useGetAllTiles();

  return (
    <ScrollView style={{}}>
      {data?.map((item, index) => (
        <View
          key={item.code}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: data.length === index + 1 ? 'transparent' : '#eee',
          }}
        >
          <Item tile={item} />
        </View>
      ))}
    </ScrollView>
  )
}

export default DataTableTile;