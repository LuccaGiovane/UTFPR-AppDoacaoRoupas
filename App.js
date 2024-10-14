import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroDoacaoScreen from './screens/CadastroDoacaoScreen';
import HistoricoDoacoesScreen from './screens/HistoricoDoacoesScreen';
import DetalhesDoacaoScreen from './screens/DetalhesDoacaoScreen';
import PontosDeDoacaoScreen from './screens/PontosDeDoacaoScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HistoricoStackScreen({ doacoes, setDoacoes }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoricoDeDoacoes"
        options={{ title: 'Histórico de Doações' }}
        children={(props) => <HistoricoDoacoesScreen {...props} doacoes={doacoes} setDoacoes={setDoacoes} />}
      />
      <Stack.Screen name="DetalhesDoacao" component={DetalhesDoacaoScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [doacoes, setDoacoes] = useState([]);

  const adicionarDoacao = (itens, nome) => {
    const novaDoacao = {
      nome,
      itens,
      data: new Date().toISOString(),
    };
    setDoacoes([novaDoacao, ...doacoes]); // Adiciona a nova doação no início
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Cadastro de Doações */}
        <Tab.Screen 
          name="Cadastro"
          children={() => <CadastroDoacaoScreen adicionarDoacao={adicionarDoacao} />}
          options={{ title: 'Cadastro de Doações' }}
        />

        {/* Histórico de Doações */}
        <Tab.Screen 
          name="Historico"
          children={() => <HistoricoStackScreen doacoes={doacoes} setDoacoes={setDoacoes} />}
          options={{ title: 'Histórico de Doações' }}
        />

        {/* Pontos de Doação */}
        <Tab.Screen 
          name="PontosDeDoacao"
          component={PontosDeDoacaoScreen}
          options={{ title: 'Pontos de Doação' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
