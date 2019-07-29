import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import SingleNeighborhood from "../neighborhoods/SingleNeighborhood";
import { Button } from "react-bootstrap";

export default class SingleRoute extends Component {
  state = {
    route: [],
    redirectToHome: false
  };

  componentDidMount() {
    axios.get(`/api/routes/${this.props.match.params.routeId}`).then(res => {
      this.setState({ route: res.data });
    });
  }

  handleDelete = () => {
    axios.delete(`/api/routes/${this.props.match.params.routeId}`).then(res => {
      this.setState({ redirectToHome: true });
    });
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to={"/neighborhoods"} />;
    }
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
              href={`/routes/${this.state.route._id}/edit`}
            >
              Edit Route
            </Button>
          </li>
          <li>
            <Button
              className="delete-button"
              variant="outline-success"
              onClick={this.handleDelete}
            >
              Delete Route
            </Button>
          </li>
        </ul>
        <Button variant="outline-success">
          {" "}
          <Link to={`/neighborhoods/${this.state.route.neighborhoodId}`}>
            Back to Neighborhood
          </Link>
        </Button>
        <h2>Route</h2>
        <h2>{this.state.route.name} </h2>
        <img className="route-image"src={this.state.route.image} />
        <p className='non-card'>{this.state.route.description} </p>
        <p>Distance: {this.state.route.distance} miles </p>
        <p>Rating: {this.state.route.rating} stars </p>
        <iframe className="route-map" src={this.state.route.routeLink} />
      </div>
    );
  }
}
