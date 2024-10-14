import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Button } from 'react-native';

export default function HistoricoDoacoesScreen({ route, navigation }) {
  const { doacoes = [] } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [doacaoParaEditar, setDoacaoParaEditar] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const [doacaoParaDeletar, setDoacaoParaDeletar] = useState(null); // Doação que será deletada
  const [modalDeletarVisible, setModalDeletarVisible] = useState(false);

  // Função para salvar a edição do nome da doação
  const salvarEdicao = () => {
    doacaoParaEditar.nome = novoNome;
    setDoacaoParaEditar(null);
    setModalVisible(false);
  };

  // Função para deletar uma doação
  const deletarDoacao = () => {
    const novasDoacoes = doacoes.filter((_, index) => index !== doacaoParaDeletar);
    route.params.doacoes = novasDoacoes; // Atualiza as doações
    setModalDeletarVisible(false);
    setDoacaoParaDeletar(null);
  };

  const editarNomeDoacao = (index) => {
    setDoacaoParaEditar(doacoes[index]);
    setNovoNome(doacoes[index].nome); // Define o nome atual para editar
    setModalVisible(true); // Exibe o modal para edição
  };

  const confirmarDelecao = (index) => {
    setDoacaoParaDeletar(index);
    setModalDeletarVisible(true); // Exibe o modal de confirmação de deleção
  };

  if (doacoes.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nenhuma doação cadastrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={doacoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.doacaoContainer}>
            <TouchableOpacity
              style={styles.doacaoButton}
              onPress={() => navigation.navigate('DetalhesDoacao', { doacao: item })}
            >
              <Text style={styles.doacaoNome}>{item.nome}</Text>
            </TouchableOpacity>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => editarNomeDoacao(index)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarDelecao(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de edição do nome da doação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>Editar Nome da Doação:</Text>
          <TextInput
            style={styles.input}
            value={novoNome}
            onChangeText={setNovoNome}
          />
          <View style={styles.modalButtons}>
            <Button title="Salvar" onPress={salvarEdicao} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal de confirmação de deleção */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDeletarVisible}
        onRequestClose={() => setModalDeletarVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>Tem certeza que quer deletar {doacoes[doacaoParaDeletar]?.nome}?</Text>
          <View style={styles.modalButtons}>
            <Button title="Sim" onPress={deletarDoacao} />
            <Button title="Não" onPress={() => setModalDeletarVisible(false)} />
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
  doacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  doacaoButton: {
    flex: 1,
    backgroundColor: '#6f6f6f',
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
  },
  doacaoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
