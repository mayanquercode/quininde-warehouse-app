import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Button, TextInput as Input, MD3Colors } from 'react-native-paper';
import useGetTile from '@/tiles/hooks/useGetTile';
import useUpdateTile from '@/tiles/hooks/useUpdateTile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useDeleteTile from '@/tiles/hooks/useDeleteTile';

function ScreenEditTile() {
  // get the code from the query params
  const { code } = useLocalSearchParams();
  const { data, isLoading } = useGetTile(code as string)
  // Hook para remove ceramic tile
  const { mutate: deleteTile } = useDeleteTile()


  // Refs para manejar el focus
  const inputCode = useRef<TextInput>(null);
  const inputName = useRef<TextInput>(null);
  const inputBox = useRef<TextInput>(null);
  const inputPiece = useRef<TextInput>(null);
  const inputPieces = useRef<TextInput>(null);

  // Estado unificado
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    box: '',
    piece: '',
    pieces: ''
  });



  const { mutate: updateTile, isPending, error } = useUpdateTile()


  // Cargar los datos de la cerámica al iniciar
  useEffect(() => {
    if (data) {
      setFormData({
        code: data.code,
        name: data.name,
        box: data.box?.toString() ?? '',
        piece: data.piece?.toString() ?? '',
        pieces: data.pieces?.toString() ?? '',
      });
    }
  }, [data]);

  // Manejo genérico de cambios
  const handleChange = (field: keyof typeof formData) => (text: string) => {
    setFormData(prev => ({ ...prev, [field]: text }));
  };

  const handleSave = () => {
    // Validación de campos
    if (Object.values(formData).some(value => !value.trim())) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Validación numérica para campos de cantidad
    if (isNaN(Number(formData.box)) || isNaN(Number(formData.piece)) || isNaN(Number(formData.pieces))) {
      Alert.alert('Error', 'Los campos de cantidad deben ser números válidos.');
      return;
    }

    // Aquí puedes manejar el guardado de la nueva cerámica
    console.log('Cerámica guardada:', formData);
    updateTile(formData, {
      onSuccess: () => {
        Alert.alert('Éxito', 'Cerámica guardada correctamente');
        setFormData({
          code: '',
          name: '',
          box: '',
          piece: '',
          pieces: ''
        });
        router.back(); // Redirigir a la lista de cerámicas
      },
      onError: () => {
        Alert.alert('Error', 'No se pudo guardar la cerámica. Inténtalo más tarde.');
      },
    })

  };


  const handleDelete = () => {
    Alert.alert(
      'Eliminar cerámica',
      '¿Estás seguro de que quieres eliminar esta cerámica?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteTile(formData.code, {
              onSuccess: () => {
                Alert.alert('Éxito', 'Cerámica eliminada correctamente');
                router.back(); // Redirigir a la lista de cerámicas
              },
              onError: () => {
                Alert.alert('Error', 'No se pudo eliminar la cerámica. Inténtalo más tarde.');
              },
            })
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={s.screen}>
      <Stack.Screen
        options={{
          title: "Editar cerámica",
          headerRight(props) {
            return (
              <TouchableOpacity
                onPress={handleDelete}
                style={{ padding: 10 }}
              >
                <MaterialCommunityIcons name="trash-can" size={25} color={MD3Colors.neutral100} />
              </TouchableOpacity>
            );
          },

        }}
      />

      <View style={s.container}>
        <View style={s.groupInput}>
          <Input
            ref={inputCode}
            label="Código"
            value={formData.code}
            onChangeText={handleChange('code')}
            mode="outlined"
            disabled
            returnKeyType="next"
            onSubmitEditing={() => inputName.current?.focus()}
          />
        </View>

        <View style={s.groupInput}>
          <Input
            ref={inputName}
            label="Nombre"
            value={formData.name}
            onChangeText={handleChange('name')}
            mode="outlined"
            returnKeyType="next"
            onSubmitEditing={() => inputBox.current?.focus()}
          />
        </View>

        <View style={s.groupInput}>
          <Input
            ref={inputBox}
            label="Area de caja"
            value={formData.box}
            onChangeText={handleChange('box')}
            mode="outlined"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => inputPiece.current?.focus()}
          />
        </View>

        <View style={s.groupInput}>
          <Input
            ref={inputPiece}
            label="Area de pieza"
            value={formData.piece}
            onChangeText={handleChange('piece')}
            mode="outlined"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => inputPieces.current?.focus()}
          />
        </View>
        <View style={s.groupInput}>
          <Input
            ref={inputPieces}
            label="Cantidad de piezas"
            value={formData.pieces}
            onChangeText={handleChange('pieces')}
            mode="outlined"
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>

        <Button mode="contained" onPress={handleSave}>
          Guardar cambios
        </Button>

      </View>

      <StatusBar style='light' />
    </View>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fffbff',
    paddingTop: 20,
  },
  container: {
    paddingHorizontal: 16,
  },
  groupInput: {
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScreenEditTile;
