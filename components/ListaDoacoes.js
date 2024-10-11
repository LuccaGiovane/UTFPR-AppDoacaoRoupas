import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ListaDoacoes({ doacoes }) {
  return (
    <View style={styles.listaDoacoes}>
      <Text style={styles.label}>Doações cadastradas:</Text>
      {doacoes.length === 0 ? (
        <Text>Nenhuma doação cadastrada.</Text>
      ) : (
        doacoes.map((doacao, index) => (
          <Text key={index}>
            {`${doacao.quantidade}x ${doacao.item} - Tamanho: ${doacao.tamanho}`}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listaDoacoes: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});
