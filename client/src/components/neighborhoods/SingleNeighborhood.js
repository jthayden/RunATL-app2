import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import EditNeighborhood from "./EditNeighborhood.js";
import SingleRoute from "../routes/SingleRoute";
import { Card, CardDeck, Button } from "react-bootstrap";

export default class SingleNeighborhood extends Component {
  state = {
    neighborhood: {},
    redirectToHome: false,
    routes: []
    // groups: []
  };

  componentDidMount() {
    axios
      .get(`/api/neighborhoods/${this.props.match.params.neighborhoodId}`)
      .then(res => {
        this.setState({ neighborhood: res.data });
      });
    axios
      .get(
        `/api/routes/byNeighborhoodId/${this.props.match.params.neighborhoodId}`
      )
      .then(res => {
        this.setState({ routes: res.data });
      });
    //Not using groups now. Future implementation.
    // axios
    //   .get(
    //     `/api/groups/byNeighborhoodId/${this.props.match.params.neighborhoodId}`
    //   )
    //   .then(res => {
    //     this.setState({ groups: res.data });
    //   });
  }

  handleDelete = () => {
    axios
      .delete(`/api/neighborhoods/${this.state.neighborhood._id}`)
      .then(() => {
        this.setState({ redirectToHome: true });
      });
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/neighborhoods" />;
    }
    let routeArr = this.state.routes.map(singleRoute => {
      return (
        <div>
          <Link
            className="route-card"
            key={singleRoute._id}
            to={`/routes/${singleRoute._id}`}
            name={singleRoute.name}
            description={singleRoute.description}
            s
            distance={singleRoute.distance}
            rating={singleRoute.rating}
            image={singleRoute.image}
            routeLink={singleRoute.routeLink}
          >
            <CardDeck style={{ width: "300px", height: "350px" }}>
              <Card>
                <Card.Img variant="top" src={singleRoute.image} />
                <Card.Body>
                  <Card.Title>{singleRoute.name}</Card.Title>
                  <Card.Text>
                    Distance: {singleRoute.distance} miles
                    <br />
                    Rating: {singleRoute.rating} stars
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </Link>
        </div>
      );
    });
    
    return (
      <div>
        <ul className="navigation">
          <li>
            <Button variant="outline-success" href="/">
              Home
            </Button>
          </li>
          <li>
            <Button variant="outline-success" href="/neighborhoods">
              Neighborhoods
            </Button>
          </li>
          <li>
            <Button
              variant="outline-success"
              href={`/neighborhoods/${this.state.neighborhood._id}/edit`}
            >
              Edit Neighborhood
            </Button>
          </li>
          <li>
            <Button
              className="delete-button"
              variant="outline-success"
              onClick={this.handleDelete}
            >
              Delete Neighborhood
            </Button>
          </li>
        </ul>
        <h1>Neighborhood:</h1>
        <h2>{this.state.neighborhood.name}</h2>
        <p className="non-card">{this.state.neighborhood.description}</p>
        <img src={this.state.neighborhood.image} />

        <h2>Routes:</h2>
        <div className="route-card-container">{routeArr}</div>
        <Button variant="outline-success">
          <Link to={`/routes/${this.state.neighborhood._id}/create`}>
            Add a Route
          </Link>
        </Button>
      </div>
    );
  }
}
