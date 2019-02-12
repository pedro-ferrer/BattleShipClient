import gql from 'graphql-tag';

const StartGame = gql`
  mutation startGame($playerId: String!, $settings: JSON!) {
    startGame(player: $playerId, settings: $settings){
      player,
      settings
    }
  }
`;

const SurrenderGame = gql`
  mutation surrenderGame($playerId: String!, $gameId: String!) {
    surrenderGame(playerId: $playerId, gameId: $gameId){
      playerId,
      gameId
    }
  }
`;

const AddUser = gql`
  mutation AddUser($name:String!){
    addMi(name: $name){
      id,
      name
    }
  }
`;


export {
  StartGame,
  SurrenderGame,
  AddUser
};
