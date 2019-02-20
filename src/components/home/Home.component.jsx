// Package dependencies
import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

// Local dependencies
import CurrentGames from "../current_games/CurrentGames.component";
import GamesPool from "../games_pool/GamesPool.component";
import { withApollo, graphql, compose } from "react-apollo";
import { CreateGame } from "../../graphql/mutations/Game";
import { GetAllCurrentGameByPlayer } from "../../graphql/queries/Game";

// Styles
import classes from "./Home.module.scss";

const TITLE = "Battleship";

class Home extends Component {
  createGame = () => {
    this.props
      .CreateGame({
        variables: {
          playerId: "5c672a4dee91a42ab49ee510" // TODO: Unic Player, will be change when implementes User's Module
        },
        refetchQueries:[
          {
            query: GetAllCurrentGameByPlayer,
            variables: { idPlayer: "5c672a4dee91a42ab49ee510" } // TODO: Unic Player, will be change when implementes User's Module
          }
        ]
      })
      .then(currentGameResponse => {
        this.props.history.push(
          `/game/${currentGameResponse.data.createCurrentGame.id}`
        );
      });
  };

  render() {
    return (
      <div className={classes.home}>
        <Row>
          <Col xs={{ size: 12 }}>
            <div className="title">
              <h1>{TITLE}</h1>
            </div>
          </Col>
          <Col xs={{ size: 4, offset: 8 }} className="text-right">
            <Button color="info" onClick={this.createGame}>
              New Game
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <GamesPool />
          </Col>
          <Col xs="6">
            <CurrentGames />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(
  compose(
    withApollo,
    graphql(CreateGame, {name : "CreateGame"}),
    graphql(GetAllCurrentGameByPlayer)
  )(Home)
);
