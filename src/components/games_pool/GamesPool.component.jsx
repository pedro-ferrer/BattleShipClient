// Package dependencies
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Table } from 'reactstrap';
import { compose, graphql, withApollo } from 'react-apollo';
import { TestUsers } from '../../graphql/queries/Game';
import { AddUser } from '../../graphql/mutations/Game';



// Local dependencies
import { formatDateToISO } from '../../helpers/formatters/commons';
import TableRow from './TableRow.component';


// TODO: Replace this mock with data fetched from the backend
const DUMMY_DATA = [
  {createdAt: formatDateToISO(moment()), player: {id: 2, name: 'Donald Trump'}},
];

class GamesPool extends Component {
  state = {gamesAvailable: []};

  getRows = () => {
    return DUMMY_DATA.map((gameData, index) => <TableRow index={index} {...gameData} />);
  };

  displayUsers(){
    var data = this.props.TestUsers;
    if(data.loading){
      return(<div>Loading Users...</div>)
    }else{
      return data.users.map(user => {
        return(
          <li key={user.id}>{user.name}</li>
        );
      });
    }
  }

  render() {
    return (
      <Fragment>
        <h3>Games Pool</h3>
        <div>{this.displayUsers()}</div>
        <Table striped bordered hover dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Created At</th>
              <th>Player</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default compose(
  withApollo,
  graphql(TestUsers, {name:"TestUsers"}),
  graphql(AddUser,{name:"AddUser"})
)(GamesPool);
