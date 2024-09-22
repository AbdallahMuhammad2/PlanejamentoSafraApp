import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';

const MarketPricesScreen = () => {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Primeira requisição para obter os dados da API
        const response = await axios.get(
          'https://api.infosimples.com/api/v2/consultas/esalq/cepea?token=ZJw7krceZRhBHHq9bzsUYwxLKuTqu6rqxJm8EkF-&timeout=600&ignore_site_receipt=0'
        );

        if (response.data && response.data.data && response.data.data[0].produtos) {
          const produtos = response.data.data[0].produtos;

          // Formatar os dados para o gráfico
          const formattedPrices = produtos.map((item: any) => {
            const valorNumerico = parseFloat(item.valor.replace(/[R$\s.,]/g, '').replace(',', '.'));  // Convertendo o valor para número
            return {
              date: item.data,
              price: !isNaN(valorNumerico) ? valorNumerico : 0, // Substitui NaN por 0 ou outro valor padrão
            };
          });

          setPrices(formattedPrices);
        } else {
          console.error('Estrutura inesperada na resposta da API.');
        }
      } catch (error) {
        console.error('Erro ao buscar preços de mercado:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (prices.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nenhum dado de preços disponível.</Text>
      </View>
    );
  }

  const labels = prices.map(item => {
    const date = new Date(item.date);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const data = prices.map(item => item.price);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Preço de Mercado'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '1',
      stroke: '#2280B0',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Preços de Mercado Agrícola - Brasil" />
        <Card.Content>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            fromZero
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default MarketPricesScreen;
