import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

export default function DetalhesDoacaoScreen({ route, navigation }) {
  const { doacao } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Doação</Text>

      {/* Lista de itens da doação */}
      <FlatList
        data={doacao.itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.quantidade}x {item.item} - Tamanho: {item.tamanho}</Text>
          </View>
        )}
      />

      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  backButton: {
    backgroundColor: '#6f6f6f',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
