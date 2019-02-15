// Package dependencies
import React, { Component, Fragment } from "react";
import { compose, graphql, withApollo, Query } from "react-apollo";
import { Table } from "reactstrap";

// Local dependencies
import TableRow from "./TableRow.component";
import { NewGameCreated } from "../../graphql/subscriptions/Game";
import { GetAllCurrentGameByPlayer } from "../../graphql/queries/Game";

class CurrentGames extends Component {
  state = { gamesAvailable: [] };

  getRows = () => {
    if (this.props.data.currentGames) {
      return this.props.data.currentGames.map((gameData, index) => (
        <TableRow index={index} {...gameData} />
      ));
    }
  };

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
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error</div>;
              if(!this.props.data.currentGames){
                this.props.data.currentGames = data.getAllCurrentGameByPlayer;
              }
              return (<tbody>{this.getRows()}</tbody>);
            }}
          </Query>
        </Table>
      </Fragment>
    );
  }

  componentWillMount() {
    this.props.client.subscribe({
      query: NewGameCreated,
      fetchPolicy: "no-cache"
    });
  }
}

export default compose(
  withApollo,
  graphql(GetAllCurrentGameByPlayer),
  graphql(NewGameCreated)
)(CurrentGames);
