// Package dependencies
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { compose, graphql, withApollo } from 'react-apollo';

// Local dependencies
import { putShipsOnCells } from '../../helpers/game/ships';
import { ships as gameShips, } from '../../constants';
import Board from '../board/Board.component';
import SurrenderModal from '../surrender_modal/SurrenderModal.component';
import { SurrenderGame, StartGame } from '../../graphql/mutations/Game';
import { TestUsers } from '../../graphql/queries/Game';


const MOCK_GAME_MATRIX = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {matrix: MOCK_GAME_MATRIX};
  }

  componentDidMount() {
    // TODO: Make a query to get the game's current status
    putShipsOnCells(this.state.matrix, gameShips)
      .then(newMatrix => {
        this.setState({matrix: newMatrix});
      });
  }

  onClick = (x, y, newStatus) => {
    // TODO: Make a mutation to modify Game's current status based on the current action
    //console.log('$ x, y, newStatus', x, y, newStatus); // eslint-disable-line
    this.props.StartGame({
      variables:{
        playerId: '1',
        settings: {}
      }
    })
  };

  surrenderGame = () => {
    // TODO: Make a mutation to modify Game's current status based on the current action
    //console.log('$ Player surrenders !'); // eslint-disable-line
    this.props.SurrenderGame({
      variables:{
        playerId: '1',
        gameId: '1'
      },
      refetchQueries:[{query: TestUsers}]
    })
  };

  render() {
    return (
      <Row className="game">
        <Col xs={{ size: 8, offset: 2 }}>
          <Board
            matrix={this.state.matrix}
            onClick={this.onClick}
          />
        </Col>
        <Col xs={{ size: 8, offset: 2 }} className="mt-3 text-center">
          <SurrenderModal onClick={this.surrenderGame} />
        </Col>
      </Row>
    );
  }
}

export default compose(
  withApollo,
  graphql(SurrenderGame, {name:"SurrenderGame"}),
  graphql(StartGame, {name:"StartGame"})
)(Game);
