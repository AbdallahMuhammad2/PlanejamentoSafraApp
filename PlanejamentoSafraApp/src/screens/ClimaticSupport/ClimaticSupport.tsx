import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, ActivityIndicator, useTheme } from 'react-native-paper';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';
import MapView, { Marker } from 'react-native-maps';

interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
}

interface WeatherData {
  current_weather: CurrentWeather;
  daily: DailyWeather;
}

const ClimaticSupportScreen = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  useEffect(() => {
    const latitude = -23.5505;
    const longitude = -46.6333;

    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherData>(
          'https://api.open-meteo.com/v1/forecast',
          {
            params: {
              latitude: latitude,
              longitude: longitude,
              current_weather: true,
              daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
              timezone: 'America/Sao_Paulo',
            },
          }
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados climáticos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Não foi possível obter os dados climáticos.</Text>
      </View>
    );
  }

  const { current_weather, daily } = weatherData;

  const barChartData = {
    labels: daily.time.map((dateStr) => {
      const date = new Date(dateStr);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        data: daily.temperature_2m_max.map((temp) => temp),
      },
    ],
  };

  const barChartConfig = {
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.background,
    color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 1,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Condições Climáticas Atuais */}
      <Card style={styles.card}>
        <Card.Title title="Condições Climáticas Atuais" titleStyle={styles.cardTitle} />
        <Card.Content>
          <Text style={styles.currentText}>Temperatura: {current_weather.temperature}°C</Text>
          <Text style={styles.currentText}>Velocidade do Vento: {current_weather.windspeed} km/h</Text>
          <Text style={styles.currentText}>Direção do Vento: {current_weather.winddirection}°</Text>
          <Text style={styles.currentText}>
            Horário Atual: {new Date(current_weather.time).toLocaleTimeString()}
          </Text>
        </Card.Content>
      </Card>

      {/* Previsão de 7 Dias */}
      <Card style={styles.card}>
        <Card.Title title="Previsão de 7 Dias" titleStyle={styles.cardTitle} />
        <Card.Content>
          <BarChart
            data={barChartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={barChartConfig}
            verticalLabelRotation={30}
            style={styles.chart}
            fromZero
            yAxisLabel=""
            yAxisSuffix="°C"
          />
        </Card.Content>
      </Card>

      {/* Mapa Climático */}
      <Card style={styles.card}>
        <Card.Title title="Mapa Climático" titleStyle={styles.cardTitle} />
        <Card.Content>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -23.5505,
              longitude: -46.6333,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
          >
            <Marker
              coordinate={{ latitude: -23.5505, longitude: -46.6333 }}
              title="Sua Propriedade"
              description="Dados climáticos atuais"
            />
          </MapView>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2288B0',
  },
  currentText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ClimaticSupportScreen;
