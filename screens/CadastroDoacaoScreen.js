import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import DoacaoForm from '../components/DoacaoForm';

export default function CadastroDoacaoScreen({ adicionarDoacao }) {
  const [itens, setItens] = useState([]); // Lista de itens
  const [editandoItem, setEditandoItem] = useState(null); // Item que está sendo editado

  const adicionarItem = (item) => {
    if (editandoItem !== null) {
      // Atualiza o item existente
      const novosItens = itens.map((i, index) => 
        index === editandoItem ? item : i
      );
      setItens(novosItens);
      setEditandoItem(null); // Limpa o modo de edição
    } else {
      // Adiciona um novo item
      setItens([...itens, item]);
    }
  };

  const editarItem = (index) => {
    setEditandoItem(index);
  };

  const handleFinalizarDoacao = (nome) => {
    adicionarDoacao(itens, nome); // Adiciona a doação
    setItens([]); // Limpa os itens após finalizar a doação
  };

  return (
    <View style={styles.container}>
      <DoacaoForm 
        adicionarDoacao={adicionarItem} 
        finalizarDoacao={handleFinalizarDoacao} 
        itemEditado={itens[editandoItem]} // Passa o item a ser editado para o form
      />

      <Text style={styles.label}>Itens cadastrados:</Text>
      <FlatList
        data={itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text>{item.quantidade}x {item.item} - Tamanho: {item.tamanho}</Text>
            <TouchableOpacity onPress={() => editarItem(index)} style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
  },
});
