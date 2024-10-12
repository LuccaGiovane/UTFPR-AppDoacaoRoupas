import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroDoacaoScreen from './screens/CadastroDoacaoScreen';
import HistoricoDoacoesScreen from './screens/HistoricoDoacoesScreen';
import DetalhesDoacaoScreen from './screens/DetalhesDoacaoScreen'; // Importa a tela de detalhes

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HistoricoStackScreen({ doacoes }) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HistóricoPrincipal" 
        component={HistoricoDoacoesScreen}
        options={{ title: 'Histórico de Doações' }} // Título será exibido apenas aqui
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
    setDoacoes([novaDoacao, ...doacoes]);
  };
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Cadastro de Doações */}
        <Tab.Screen 
          name="Cadastro" 
          options={{ title: 'Cadastro de Doações' }} // Define o título da aba
        >
          {() => <CadastroDoacaoScreen adicionarDoacao={adicionarDoacao} />}
        </Tab.Screen>

        {/* Histórico de Doações */}
        <Tab.Screen 
          name="Histórico" 
          options={{ title: 'Histórico' }} // Aba da Bottom Tab renomeada para "Histórico"
        >
          {() => <HistoricoStackScreen doacoes={doacoes} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
