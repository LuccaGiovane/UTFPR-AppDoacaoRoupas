import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text } from 'react-native';
import DoacaoForm from '../components/DoacaoForm';

export default function CadastroDoacaoScreen({ adicionarDoacao }) {
  const [itens, setItens] = useState([]); // Lista de itens

  const adicionarItem = (item) => {
    setItens([...itens, item]); // Adiciona o novo item à lista
  };

  const finalizarDoacao = (nome) => {
    if (itens.length > 0) {
      adicionarDoacao(itens, nome); // Adiciona a doação
      setItens([]); // Limpa os itens após finalizar a doação
    } else {
      alert("Adicione pelo menos um item antes de finalizar.");
    }
  };

  return (
    <View style={styles.container}>
      <DoacaoForm adicionarDoacao={adicionarItem} finalizarDoacao={finalizarDoacao} />
      
      <Text style={styles.label}>Itens adicionados:</Text>
      {itens.length > 0 ? (
        <FlatList
          data={itens}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text>{item.quantidade}x {item.item} - Tamanho: {item.tamanho}</Text>
          )}
        />
      ) : (
        <Text>Nenhum item adicionado ainda.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});
