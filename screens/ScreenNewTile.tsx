import { Stack } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, TextInput as Input } from 'react-native-paper';
import useCreateTile from '@/tiles/hooks/useCreateTile'

function ScreenNewTile() {
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

  const { mutate: createTile, isPending, error } = useCreateTile()

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
    createTile(formData, {
      onSuccess: () => {
        Alert.alert('Éxito', 'Cerámica guardada correctamente');
        setFormData({
          code: '',
          name: '',
          box: '',
          piece: '',
          pieces: ''
        });
        inputCode.current?.focus();
      },
      onError: () => {
        Alert.alert('Error', 'No se pudo guardar la cerámica. Inténtalo más tarde.');
      },
    })

  };

  return (
    <View style={s.screen}>
      <Stack.Screen options={{ title: "Nueva cerámica" }} />

      <View style={s.container}>
        <View style={s.groupInput}>
          <Input
            ref={inputCode}
            label="Código"
            value={formData.code}
            onChangeText={handleChange('code')}
            mode="outlined"
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
          Guardar ceramica
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

export default ScreenNewTile;