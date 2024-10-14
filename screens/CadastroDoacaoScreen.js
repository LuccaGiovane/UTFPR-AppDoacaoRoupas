import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import DoacaoForm from '../components/DoacaoForm';

export default function CadastroDoacaoScreen({ adicionarDoacao }) {
  const [itens, setItens] = useState([]); // Lista de itens
  const [editandoItem, setEditandoItem] = useState(null); // Item que está sendo editado
  const [itemParaDeletar, setItemParaDeletar] = useState(null); // Item que está em processo de deletar
  const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade do modal

  const adicionarItem = (item) => {
    // Verifica se a quantidade é um número válido
    if (isNaN(item.quantidade) || item.quantidade <= 0) {
      Alert.alert("Erro", "A quantidade deve ser um número positivo.");
      return;
    }

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

  const confirmarDelecao = (index) => {
    setItemParaDeletar(index);
    setModalVisible(true); // Exibe o modal para confirmação
  };

  const deletarItem = () => {
    const novosItens = itens.filter((_, index) => index !== itemParaDeletar); // Remove o item selecionado
    setItens(novosItens);
    setModalVisible(false); // Fecha o modal após deletar
    setItemParaDeletar(null); // Limpa o item a ser deletado
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
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => editarItem(index)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarDelecao(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de confirmação de deleção */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>Tem certeza que quer deletar {itens[itemParaDeletar]?.item}?</Text>
          <View style={styles.modalButtons}>
            <Button title="Sim" onPress={deletarItem} />
            <Button title="Não" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  actionsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: 200,
  },
});
