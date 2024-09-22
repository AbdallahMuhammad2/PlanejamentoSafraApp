import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addEntry, removeEntry } from '../../store/FinancialSlice';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid'; // Usando o pacote 'uuid'

const FinancialMonitoringScreen = () => {
  const entries = useSelector((state: RootState) => state.financial.entries);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddEntry = () => {
    // Navegue para uma tela de formulário para adicionar uma entrada
    navigation.navigate('AddFinancialEntry');
  };

  const handleRemoveEntry = (id: string) => {
    dispatch(removeEntry(id));
  };

  const renderItem = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Title title={item.category} subtitle={`${item.type} - R$${item.amount}`} />
      <Card.Content>
        <Text>Data: {new Date(item.date).toLocaleDateString()}</Text>
        {item.description && <Text>Descrição: {item.description}</Text>}
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => handleRemoveEntry(item.id)}>Remover</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma entrada financeira registrada.</Text>}
      />
      <FAB style={styles.fab} icon="plus" onPress={handleAddEntry} />
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
  empty: {
    textAlign: 'center',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default FinancialMonitoringScreen;
