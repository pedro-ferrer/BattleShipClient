import gql from 'graphql-tag';


//const FetchCurrentGames = gql``;

//const FetchMyGames = gql``;

//const FetchGameData = gql``;

const TestUsers = gql`
  query{
    users{
      id,
      name
    }
  }
`

export {
  //FetchCurrentGames,
  // FetchMyGames,
  // FetchGameData,
  TestUsers
};
