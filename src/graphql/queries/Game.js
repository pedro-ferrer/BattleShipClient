import gql from "graphql-tag";

const GetAllCurrentGameByPlayer = gql`
  query getAllCurrentGameByPlayer($idPlayer:ID){
    getAllCurrentGameByPlayer(idPlayer:$idPlayer){
      id
      createdAt
      timePlayed
      currentTurn{
        id
        name
      }
    }
  }
`;

export { GetAllCurrentGameByPlayer };
