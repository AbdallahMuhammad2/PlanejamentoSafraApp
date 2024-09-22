import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { PieChart } from 'react-native-chart-kit';

const ProfitabilityAnalysisScreen = () => {
  const financialEntries = useSelector((state: RootState) => state.financial.entries);
  const inputs = useSelector((state: RootState) => state.input.inputs);
  const [profitability, setProfitability] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Substitua com a lógica ou API para análise de lucratividade
    const analyzeProfitability = async () => {
      try {
        // Exemplo fictício: calcular lucro líquido
        const totalEntradas = financialEntries
          .filter(entry => entry.type === 'entrada')
          .reduce((acc, entry) => acc + entry.amount, 0);
        const totalSaidas = financialEntries
          .filter(entry => entry.type === 'saida')
          .reduce((acc, entry) => acc + entry.amount, 0);
        const lucroLiquido = totalEntradas - totalSaidas;

        setProfitability({
          totalEntradas,
          totalSaidas,
          lucroLiquido,
        });
      } catch (error) {
        console.error('Erro na análise de lucratividade:', error);
      } finally {
        setLoading(false);
      }
    };

    analyzeProfitability();
  }, [financialEntries]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!profitability) {
    return (
      <View style={styles.container}>
        <Text>Não foi possível realizar a análise de lucratividade.</Text>
      </View>
    );
  }

  // Preparar os dados para o gráfico de pizza (Distribuição de Entradas e Saídas)
  const pieChartData = [
    {
      name: 'Entradas',
      population: profitability.totalEntradas,
      color: '#4caf50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Saídas',
      population: profitability.totalSaidas,
      color: '#f44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  // Configuração do gráfico de pizza
  const pieChartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 2,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Análise de Lucratividade */}
      <Card style={styles.card}>
        <Card.Title title="Análise de Lucratividade" />
        <Card.Content>
          <Text>Total de Entradas: R$ {profitability.totalEntradas.toFixed(2)}</Text>
          <Text>Total de Saídas: R$ {profitability.totalSaidas.toFixed(2)}</Text>
          <Text>Lucro Líquido: R$ {profitability.lucroLiquido.toFixed(2)}</Text>
        </Card.Content>
      </Card>

      {/* Distribuição de Entradas e Saídas */}
      <Card style={styles.card}>
        <Card.Title title="Distribuição de Entradas e Saídas" />
        <Card.Content>
          <PieChart
            data={pieChartData}
            width={Dimensions.get('window').width - 40} // largura do gráfico
            height={220}
            chartConfig={pieChartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute // para exibir valores absolutos
          />
        </Card.Content>
      </Card>

      {/* Adicione mais gráficos e análises conforme necessário */}
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
});

export default ProfitabilityAnalysisScreen;
