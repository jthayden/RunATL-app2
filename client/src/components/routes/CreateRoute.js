import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class CreateRoute extends Component {
  state = {
    newRoute: {
      name: "",
      description: "",
      distance: "",
      rating: "",
      neighborhoodId: "",
      image: "",
      routeLink: ""
    },
    redirectToHome: false
  };

  componentDidMount() {
    const idRoute = { ...this.state.newRoute };
    idRoute.neighborhoodId = this.props.match.params.neighborhoodId;
    this.setState({ newRoute: idRoute });
  }

  handleInputChange = event => {
    event.preventDefault();
    const copiedRoute = { ...this.state.newRoute };
    copiedRoute[event.target.name] = event.target.value;
    this.setState({ newRoute: copiedRoute });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post(
        `/api/routes/byNeighborhoodId/${
          this.props.match.params.neighborhoodId
        }`,
        this.state.newRoute
      )
      .then(() => {
        this.setState({ redirectToHome: true });
      });
  };

  render() {
    if (this.state.redirectToHome) {
      return (
        <Redirect to={`/neighborhoods/${this.state.newRoute.neighborhoodId}`} />
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-route-name">Route Name</label>
          <input
            type="text"
            name="name"
            id="new-route-name"
            onChange={this.handleInputChange}
            value={this.state.newRoute.name}
          />
          <label htmlFor="new-route-description">Route Description</label>
          <input
            type="text"
            name="description"
            id="new-route-description"
            onChange={this.handleInputChange}
            value={this.state.newRoute.description}
          />
          <label htmlFor="new-route-distance">Route Distance</label>
          <input
            type="number"
            name="distance"
            id="new-route-distance"
            onChange={this.handleInputChange}
            value={this.state.newRoute.distance}
          />
          <label htmlFor="new-route-rating">Rating</label>
          <input
            type="number"
            name="rating"
            id="new-route-rating"
            onChange={this.handleInputChange}
            value={this.state.newRoute.rating}
          />
          <label htmlFor="new-route-image">Image</label>
          <input
            type="text"
            name="image"
            id="new-route-image"
            onChange={this.handleInputChange}
            value={this.state.newRoute.image}
          />
          <label htmlFor="new-route-route-link">Route Link</label>
          <input
            type="text"
            name="routeLink"
            id="new-route-route-link"
            onChange={this.handleInputChange}
            value={this.state.newRoute.routeLink}
          />
          <input className="button" type="submit" value="Add New Route" />
        </form>
      </div>
    );
  }
}
