import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class EditNeighborhood extends Component {
  state = {
    neighborhood: {},
    redirectToHome: false
  };

  componentDidMount() {
    axios
      .get(`/api/neighborhoods/${this.props.match.params.neighborhoodId}`)
      .then(res => {
        this.setState({ neighborhood: res.data });
      });
  }

  handleInputChange = event => {
    const copiedNeighborhood = { ...this.state.neighborhood };
    copiedNeighborhood[event.target.name] = event.target.value;
    this.setState({ neighborhood: copiedNeighborhood });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .put(
        `/api/neighborhoods/${this.state.neighborhood._id}`,
        this.state.neighborhood
      )
      .then(res => {
        this.setState({
          neighborhood: res.data
        });
        this.setState({ redirectToHome: true });
      });
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to={`/neighborhoods/${this.state.neighborhood._id}`} />;
    }
    return (
      <div>
        <h1>Edit Neighborhood</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="neighborhood-name">Neighborhood Name</label>
          <input
            type="text"
            id="neighborhood-name"
            name="name"
            onChange={this.handleInputChange}
            value={this.state.neighborhood.name}
          />
          <label htmlFor="neighborhood-description">
            Neighborhood Description
          </label>
          <input
            type="text"
            id="neighborhood-description"
            name="description"
            onChange={this.handleInputChange}
            value={this.state.neighborhood.description}
          />
          <label htmlFor="neighborhood-image">Neighborhood Image</label>
          <input
            type="text"
            name="image"
            id="neighborhood-image"
            onChange={this.handleInputChange}
            value={this.state.neighborhood.image}
          />
          <input className="button" type="submit" value="Update Neighborhood" />
        </form>
      </div>
    );
  }
}
