// Package dependencies
import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";

// Local dependencies
import CurrentGames from "../current_games/CurrentGames.component";
import GamesPool from "../games_pool/GamesPool.component";
import { withApollo, graphql, compose } from "react-apollo";
import { CreateGame } from "../../graphql/mutations/Game";

// Styles
import classes from "./Home.module.scss";

const TITLE = "Battleship";

class Home extends Component {
  createGame = () => {
    this.props.CreateGame({
      variables: {
        playerId: "5c672a4dee91a42ab49ee510" // TODO: Unic Player, will be change when implementes User's Module
      }
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
    )
  }
}

export default compose(graphql(CreateGame, { name: "CreateGame" }))(Home);
