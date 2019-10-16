import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class CreateNeighborhood extends Component {
  state = {
    newNeighborhood: {},
    redirectToHome: false
  };

  componentDidMount() {
    this.getAllNeighborhoods();
  }

  getAllNeighborhoods = () => {
    axios.get("/api/neighborhoods").then(res => {
      this.setState({ neighborhoods: res.data });
    });
  };

  handleInputChange = event => {
    event.preventDefault();
    const copiedNeighborhood = { ...this.state.newNeighborhood };
    copiedNeighborhood[event.target.name] = event.target.value;
    this.setState({ newNeighborhood: copiedNeighborhood });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios.post("/api/neighborhoods", this.state.newNeighborhood).then(() => {
      this.setState({ redirectToHome: true });
      this.getAllNeighborhoods();
    });
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/neighborhoods" />;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-neighborhood-name">Neighborhood Name</label>
          <input
            type="text"
            name="name"
            id="new-neighborhood-name"
            onChange={this.handleInputChange}
            value={this.state.newNeighborhood.name}
          />
          <label htmlFor="new-neighborhood-description">
            Neighborhood Description
          </label>
          <input
            type="text"
            name="description"
            id="new-neighborhood-description"
            onChange={this.handleInputChange}
            value={this.state.newNeighborhood.description}
          />
          <label htmlFor="new-neighborhood-image">Neighborhood Image</label>
          <input
            type="text"
            name="image"
            id="new-neighborhood-image"
            onChange={this.handleInputChange}
            value={this.state.newNeighborhood.image}
          />
          <input
            className="button"
            type="submit"
            value="Add New Neighborhood"
          />
        </form>
      </div>
    );
  }
}
