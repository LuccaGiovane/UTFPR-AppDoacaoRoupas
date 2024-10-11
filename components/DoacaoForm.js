import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function DoacaoForm({ adicionarDoacao, finalizarDoacao }) {
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tamanho, setTamanho] = useState('M');
  const [modalVisible, setModalVisible] = useState(false);
  const [doacaoNome, setDoacaoNome] = useState('');

  const handleAdicionar = () => {
    if (item && quantidade && tamanho) {
      adicionarDoacao({ item, quantidade, tamanho });
      setItem('');
      setQuantidade('');
      setTamanho('M');
    } else {
      alert("Preencha todos os campos.");
    }
  };

  const handleFinalizarDoacao = () => {
    if (doacaoNome) {
      finalizarDoacao(doacaoNome); // Passa o nome da doação
      setDoacaoNome('');
    } else {
      alert("Informe um nome para a doação.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item:</Text>
      <TextInput
        style={styles.input}
        value={item}
        onChangeText={setItem}
        placeholder="Ex: Camiseta"
      />

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Ex: 3"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tamanho:</Text>

      {/* Modal para escolher o tamanho */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.tamanhoInput}>
        <Text>{tamanho}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Picker
            selectedValue={tamanho}
            onValueChange={(itemValue) => setTamanho(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="PP" value="PP" />
            <Picker.Item label="P" value="P" />
            <Picker.Item label="M" value="M" />
            <Picker.Item label="G" value="G" />
            <Picker.Item label="GG" value="GG" />
            <Picker.Item label="EG" value="EG" />
            <Picker.Item label="EGG" value="EGG" />
          </Picker>

          <TouchableOpacity style={styles.confirmButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Button title="Adicionar Doação" onPress={handleAdicionar} />

      {/* Campo para o nome da doação */}
      <TextInput
        style={styles.input}
        value={doacaoNome}
        onChangeText={setDoacaoNome}
        placeholder="Nome da Doação"
      />

      <Button title="Finalizar Doação" onPress={handleFinalizarDoacao} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  tamanhoInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  picker: {
    width: 300,
    backgroundColor: 'white',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
