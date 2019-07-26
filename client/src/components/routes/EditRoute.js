import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class EditRoute extends Component {
  state = {
    route: {},
    redirecttoHome: false
  };

  componentDidMount() {
    axios.get(`/api/routes/${this.props.match.params.routeId}`).then(res => {
      this.setState({ route: res.data });
    });
  }

  handleInputChange = event => {
    const copiedRoute = { ...this.state.route };
    copiedRoute[event.target.name] = event.target.value;
    this.setState({ route: copiedRoute });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`/api/routes/${this.state.route._id}`, this.state.route)
      .then(res => {
        this.setState({
          route: res.data
        });
        this.setState({ redirecttoHome: true });
      });
  };

  render() {
    if (this.state.redirecttoHome) {
      return <Redirect to={`/routes/${this.state.route._id}`} />;
    }
    return (
      <div>
        <h1>Edit Route</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="route-name">Route Name</label>
          <input
            type="text"
            name="name"
            id="route-name"
            onChange={this.handleInputChange}
            value={this.state.route.name}
          />
          <label htmlFor="route-description">Route Description</label>
          <input
            type="text"
            name="description"
            id="route-description"
            onChange={this.handleInputChange}
            value={this.state.route.description}
          />
          <label htmlFor="route-distance">Route Distance</label>
          <input
            type="number"
            name="distance"
            id="route-distance"
            onChange={this.handleInputChange}
            value={this.state.route.distance}
          />
          <label htmlFor="route-rating">Rating</label>
          <input
            type="number"
            name="rating"
            id="route-rating"
            onChange={this.handleInputChange}
            value={this.state.route.rating}
          />
          <label htmlFor="route-image">Image</label>
          <input
            type="text"
            name="image"
            id="route-image"
            onChange={this.handleInputChange}
            value={this.state.route.image}
          />
          <label htmlFor="route-route-link">Route Link</label>
          <input
            type="text"
            name="routeLink"
            id="route-route-link"
            onChange={this.handleInputChange}
            value={this.state.route.routeLink}
          />
          <input className="button" type="submit" value="Edit Route" />
        </form>
      </div>
    );
  }
}
