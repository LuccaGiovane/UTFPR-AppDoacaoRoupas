import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroDoacaoScreen from './screens/CadastroDoacaoScreen';
import HistoricoDoacoesScreen from './screens/HistoricoDoacoesScreen';
import DetalhesDoacaoScreen from './screens/DetalhesDoacaoScreen'; // Importa a tela de detalhes

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HistoricoStackScreen({ route }) {
  const { doacoes } = route.params || { doacoes: [] }; // Verifica se há doações
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="HistoricoDeDoacoes"
        component={HistoricoDoacoesScreen}
        options={{ title: 'Histórico de Doações' }}
        initialParams={{ doacoes }} // Passa as doações via parâmetros
      />
      <Stack.Screen name="DetalhesDoacao" component={DetalhesDoacaoScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [doacoes, setDoacoes] = useState([]); // Inicializa como array vazio

  const adicionarDoacao = (itens, nome) => {
    const novaDoacao = {
      nome: nome,
      itens: itens,
      data: new Date().toISOString(), // Converte a data para string serializável
    };
    setDoacoes([novaDoacao, ...doacoes]); // Atualiza o estado com a nova doação
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Cadastro de Doações */}
        <Tab.Screen 
          name="Cadastro" 
          component={() => <CadastroDoacaoScreen adicionarDoacao={adicionarDoacao} />}
          options={{ title: 'Cadastro de Doações' }}
        />

        {/* Histórico de Doações */}
        <Tab.Screen 
          name="Historico"
          component={() => <HistoricoStackScreen route={{ params: { doacoes } }} />} // Passa as doações como parâmetro
          options={{ title: 'Histórico de Doações' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
