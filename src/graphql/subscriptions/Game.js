import gql from "graphql-tag";

const NewGameCreated = gql`
  subscription onCreateNewGame {
    currentGames {
      id
      createdAt
      timePlayed
      currentTurn {
        id
        player : name
      }
    }
  }
`;

export { NewGameCreated };
