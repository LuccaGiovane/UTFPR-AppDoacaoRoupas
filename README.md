# AppDoacaoRoupas
O AppDoacaoRoupas é um aplicativo de doação de roupas desenvolvido em React Native com Expo CLI. O aplicativo permite que os usuários cadastrem doações de roupas, visualizem o histórico das doações realizadas, e vejam detalhes de cada doação. Além disso, há uma funcionalidade de mapa, onde são exibidos pontos de coleta pré-cadastrados, e a localização do usuário é mostrada para facilitar a identificação do ponto de doação mais próximo.

## Funcionalidades principais:
- Cadastro de Doações: Os usuários podem adicionar itens (roupas) às doações e finalizá-las com um nome.
- Histórico de Doações: As doações realizadas são exibidas em uma lista, permitindo visualização, edição do nome da doação e exclusão.
- Mapa de Pontos de Doação: Mostra os pontos de coleta pré-cadastrados em um mapa, com a localização atual do usuário.

## Pré-requisitos
Antes de começar, certifique-se de ter instalado as seguintes ferramentas em seu ambiente de desenvolvimento:

- Node.js: [Instalar o Node.js](https://nodejs.org/pt)
- Expo CLI: O Expo facilita o desenvolvimento e teste de aplicativos React Native. Instale-o globalmente com o comando:
  ```bash
    npm install -g expo-cli
  ```
## Instalação
Siga os passos abaixo para clonar o repositório e configurar o ambiente:

1. Clone o repositório:
   ```bash
    git clone https://github.com/LuccaGiovane/UTFPR-AppDoacaoRoupas.git
   ```
2. Acesse a pasta do projeto:
   ```bash
    cd UTFPR-AppDoacaoRoupas
   ```
3. Instale as dependências do projeto:
   ```bash
    npm install
   ```

## Dependências Principais
As principais dependências do projeto são:
- React Navigation: Navegação entre telas do aplicativo.
   ```bash
    npm install @react-navigation/native
    npm install @react-navigation/stack
    npm install @react-navigation/bottom-tabs
    npm install react-native-screens react-native-safe-area-context
   ```
- React Native Maps: Utilizado para exibir o mapa e os pontos de doação.
   ```bash
    expo install react-native-maps
   ```
- Expo Location: Utilizado para acessar a localização do usuário no mapa.
  ```bash
    expo install expo-location
   ```
- Expo: Ferramenta base para o desenvolvimento do app, fornecendo SDKs para múltiplas funcionalidades.
  ```bash
    npm install expo
   ```
- React Native Elements: Biblioteca para componentes prontos como botões, modais, etc.
  ```bash
    npm install react-native-elements
   ```

## Executando o Projeto
1. Após instalar as dependências, você pode rodar o projeto no seu emulador Android/iOS ou em um dispositivo físico através do aplicativo Expo Go.
2. Execute o seguinte comando para iniciar o projeto:
    ```bash
    npx expo start
   ```
3. Abra o aplicativo Expo Go no seu celular e escaneie o QR Code gerado no terminal ou navegador para visualizar o app.

## Contribuição
Sinta-se à vontade para contribuir com o projeto abrindo issues ou criando pull requests. Toda ajuda é bem-vinda!
