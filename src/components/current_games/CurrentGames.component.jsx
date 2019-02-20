// Package dependencies
import React, { Component, Fragment } from "react";
import {
  compose,
  graphql,
  withApollo,
  Query
} from "react-apollo";
import { Table } from "reactstrap";

// Local dependencies
import TableRow from "./TableRow.component";
import { NewGameCreated } from "../../graphql/subscriptions/Game";
import { GetAllCurrentGameByPlayer } from "../../graphql/queries/Game";

class CurrentGames extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getRows(listCurrentGameByPlayer) {
    if (listCurrentGameByPlayer) {
      return listCurrentGameByPlayer.map((gameData, index) => (
        <TableRow key={index} index={index} {...gameData} />
      ));
    }
  }

  render() {
    return (
      <Fragment>
        <h3>My current games</h3>
        <Table striped bordered hover dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Created At</th>
              <th>Time Played</th>
              <th>Turn</th>
              <th />
            </tr>
          </thead>
          <Query
            query={GetAllCurrentGameByPlayer}
            variables={{ idPlayer: "5c672a4dee91a42ab49ee510" }}
            // TODO: Unic Player, will be change when implementes User's Module
          >
            {({ loading, error, data }) => {
              if (loading) return <tbody><tr><td>Loading games...</td></tr></tbody>;
              if (error) return <tbody><tr><td>Error!</td></tr></tbody>;
              return (
                <tbody>{this.getRows(data.getAllCurrentGameByPlayer)}</tbody>
              );
            }}
          </Query>
        </Table>
      </Fragment>
    );
  }

  componentWillMount() {
    /*Code storage, will be functional later */


    // this.props.client
    //   .subscribe({
    //     query: NewGameCreated,
    //     fetchPolicy: "network-only"
    //   })
    //   .subscribe(currentGamesSubs => {
    //     this.currentGamesList = currentGamesSubs.data.currentGames;
    //   });
    // return(<Subscription subscription={NewGameCreated}>
    //   {(loading, error, data) => {
    //     if(data)
    //       this.props.data.currentGames = data
    //     return (
    //       <tbody>{this.getRows()}</tbody>
    //     );
    //   }}
    // </Subscription>)
  }
}

export default compose(
  withApollo,
  graphql(GetAllCurrentGameByPlayer),
  graphql(NewGameCreated)
)(CurrentGames);
