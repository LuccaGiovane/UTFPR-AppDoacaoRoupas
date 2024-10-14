import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Button } from 'react-native';

export default function HistoricoDoacoesScreen({ doacoes, setDoacoes, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeletarVisible, setModalDeletarVisible] = useState(false);
  const [doacaoParaEditar, setDoacaoParaEditar] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const [doacaoParaDeletar, setDoacaoParaDeletar] = useState(null);

  // Função para salvar a edição do nome da doação
  const salvarEdicao = () => {
    const novasDoacoes = doacoes.map((doacao) => 
      doacao === doacaoParaEditar ? { ...doacao, nome: novoNome } : doacao
    );
    setDoacoes(novasDoacoes);
    setModalVisible(false);
  };

  // Função para deletar uma doação
  const deletarDoacao = () => {
    const novasDoacoes = doacoes.filter((doacao) => doacao !== doacaoParaDeletar);
    setDoacoes(novasDoacoes);
    setModalDeletarVisible(false);
  };

  // Se não houver doações, exibir uma mensagem
  if (!doacoes || doacoes.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nenhuma doação cadastrada ainda.</Text>
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
              <Text style={styles.doacaoData}>{new Date(item.data).toLocaleString()}</Text>
            </TouchableOpacity>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => {
                setDoacaoParaEditar(item);
                setNovoNome(item.nome);
                setModalVisible(true);
              }} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setDoacaoParaDeletar(item);
                setModalDeletarVisible(true);
              }} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de edição */}
      <Modal
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
        transparent={true}
        visible={modalDeletarVisible}
        onRequestClose={() => setModalDeletarVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>Tem certeza que quer deletar {doacaoParaDeletar?.nome}?</Text>
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
  doacaoData: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
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
