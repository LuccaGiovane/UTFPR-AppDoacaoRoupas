import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CadastroDoacaoScreen from './screens/CadastroDoacaoScreen';
import HistoricoDoacoesScreen from './screens/HistoricoDoacoesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [doacoes, setDoacoes] = useState([]); // Inicializa como array vazio

  const adicionarDoacao = (itens, nome) => {
    const novaDoacao = {
      nome: nome, // Nome dado pelo usuário
      itens: itens,
      data: new Date(), // Data da doação
    };
    setDoacoes([novaDoacao, ...doacoes]); // Adiciona a nova doação no topo
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Cadastro de Doações */}
        <Tab.Screen name="Cadastro de Doações">
          {() => <CadastroDoacaoScreen adicionarDoacao={adicionarDoacao} />}
        </Tab.Screen>

        {/* Histórico de Doações */}
        <Tab.Screen name="Histórico de Doações">
          {() => <HistoricoDoacoesScreen doacoes={doacoes} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
