import gql from "graphql-tag";

const CreateGame = gql`
  mutation($playerId: String) {
    createCurrentGame(playerId: $playerId) {
      id
      createdAt
      timePlayed
      currentTurn {
        id
        name
      }
    }
  }
`;

export { CreateGame };
