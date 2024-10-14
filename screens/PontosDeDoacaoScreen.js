import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function PontosDeDoacaoScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Pontos de doação pré-cadastrados
  const pontosDeDoacao = [
    { id: 1, nome: "Guarda Municipal", endereco: "Rua Prof. Joaquim de Matos Barreto, 333", latitude: -23.327656, longitude: -51.170834 },
    { id: 2, nome: "Corpo de Bombeiros", endereco: "Rua Jaguaribe, 473", latitude: -23.294696998685847, longitude:  -51.16921428255008},
    { id: 3, nome: "Aeroporto Governador José Richa", endereco: "Rua Ten. João Maurício Medeiros, 300", latitude: -23.328423402722635, longitude: -51.13770424564545 },
    { id: 4, nome: "Correios", endereco: "Rua Pernambuco, 21", latitude: -23.307628475643767, longitude:  -51.16267574449019 },
  ];

  // Função para obter a localização atual do usuário
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada.');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  // Mensagem de erro se não houver permissão
  let text = 'Obtendo localização...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = 'Localização obtida com sucesso!';
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.304452, // Centro de Londrina
          longitude: -51.169582,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true} // Exibe a localização do usuário no mapa
      >
        {/* Exibe os pontos de doação no mapa */}
        {pontosDeDoacao.map((ponto) => (
          <Marker
            key={ponto.id}
            coordinate={{ latitude: ponto.latitude, longitude: ponto.longitude }}
            title={ponto.nome}
            description={ponto.endereco}
          />
        ))}
      </MapView>

      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  text: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
});
