import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetalhesDoacaoScreen({ route }) {
  const { doacao } = route.params; // Recebe a doação selecionada

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da Doação: {doacao.nome}</Text>
      {doacao.itens.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text>{item.quantidade}x {item.item} - Tamanho: {item.tamanho}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginVertical: 10,
  },
});
