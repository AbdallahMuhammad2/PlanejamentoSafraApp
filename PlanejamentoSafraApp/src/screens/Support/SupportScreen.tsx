import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SupportScreen = () => {
  const [visible, setVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const navigation = useNavigation();

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setQuestion('');
    setResponse('');
  };

  const handleSubmit = async () => {
    // Integre com uma API de IA, como OpenAI, para obter respostas
    try {
      const API_KEY = 'SUA_API_OPENAI';
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: question,
          max_tokens: 150,
        }),
      });
      const data = await response.json();
      setResponse(data.choices[0].text.trim());
    } catch (error) {
      console.error('Erro ao obter resposta da IA:', error);
      setResponse('Desculpe, houve um erro ao processar sua pergunta.');
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={showDialog}>
        Fazer Pergunta
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Assistente Virtual</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Sua Pergunta"
              value={question}
              onChangeText={setQuestion}
              mode="outlined"
              multiline
            />
            {response ? (
              <Text style={styles.response}>{response}</Text>
            ) : null}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            {!response ? (
              <Button onPress={handleSubmit}>Enviar</Button>
            ) : (
              <Button onPress={hideDialog}>Fechar</Button>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  response: {
    marginTop: 10,
  },
});

export default SupportScreen;
