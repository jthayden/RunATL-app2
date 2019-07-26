import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import SingleNeighborhood from "../neighborhoods/SingleNeighborhood";

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
        <Link to={`/neighborhoods/${this.state.route.neighborhoodId}`}>
          Back to Neighborhood
        </Link>
        <h2>Route</h2>
        <h2>{this.state.route.name} </h2>
        <p>{this.state.route.description} </p>
        <p>{this.state.route.distance} </p>
        <p>{this.state.route.rating} </p>
        <img src={this.state.route.image} />
        <iframe src={this.state.route.routeLink} width="640" height="480" />
        <button onClick={this.handleDelete}>Delete Route</button>
        <Link to={`/routes/${this.state.route._id}/edit`}>Edit Route</Link>
      </div>
    );
  }
}
