import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, FAB, Dialog, Portal, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addInput, removeInput } from '../../store/inputSlice';
import { v4 as uuidv4 } from 'uuid'; // Usando o pacote 'uuid'

const InputManagementScreen = () => {
  const inputs = useSelector((state: RootState) => state.input.inputs);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const [quantity, setQuantity] = useState('');

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleAddInput = () => {
    const newInput = {
      id: uuidv4().toString(),
      name: inputName,
      quantity: parseFloat(quantity),
      date: new Date().toISOString(),
    };
    dispatch(addInput(newInput));
    setInputName('');
    setQuantity('');
    hideDialog();
  };

  const handleRemoveInput = (id: string) => {
    dispatch(removeInput(id));
  };

  const renderItem = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Title title={item.name} subtitle={`Quantidade: ${item.quantity}`} />
      <Card.Content>
        <Text>Data: {new Date(item.date).toLocaleDateString()}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => handleRemoveInput(item.id)}>Remover</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={inputs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum insumo registrado.</Text>}
      />
      <FAB style={styles.fab} icon="plus" onPress={showDialog} />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Adicionar Insumo</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nome do Insumo"
              value={inputName}
              onChangeText={setInputName}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Quantidade"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button onPress={handleAddInput}>Adicionar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
  },
});

export default InputManagementScreen;
