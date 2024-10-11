import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function HistoricoDoacoesScreen({ doacoes = [], navigation }) { // Garante que doacoes sempre seja um array

  if (doacoes.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nenhuma doação cadastrada.</Text>
      </View>
    );
  }

  const renderDoacao = ({ item }) => (
    <TouchableOpacity
      style={styles.doacaoButton}
      onPress={() => navigation.navigate('DetalhesDoacao', { doacao: item })}
    >
      <Text style={styles.doacaoNome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={doacoes.sort((a, b) => b.data - a.data)} // Ordena pela data
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDoacao}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  doacaoButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  doacaoNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
