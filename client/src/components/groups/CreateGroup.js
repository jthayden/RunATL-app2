import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class CreateGroup extends Component {
  state = {
    newGroup: {
      name: "",
      description: "",
      routes: "",
      contact: ""
    },
    redirectToHome: false
  };

  componentDidMount() {
    const idGroup = { ...this.state.newGroup };
    idGroup.neighborhoodId = this.props.match.params.neighborhoodId;
    this.setState({ newGroup: idGroup });
  }

  handleInputChange = event => {
    event.preventDefault();
    const copiedGroup = { ...this.state.newGroup };
    copiedGroup[event.target.name] = event.target.value;
    this.setState({ newGroup: copiedGroup });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post(
        `/api/groups/byNeighborhoodId/${
          this.props.match.params.neighborhoodId
        }`,
        this.state.newGroup
      )
      .then(() => {
        this.setState({ redirectToHome: true });
      });
  };

  render() {
    if (this.state.redirectToHome) {
      return (
        <Redirect to={`/neighborhoods/${this.state.newGroup.neighborhoodId}`} />
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-group-name">Group Name</label>
          <input
            type="text"
            name="name"
            id="new-group-name"
            onChange={this.handleInputChange}
            value={this.state.newGroup.name}
          />
          <label htmlFor="new-group-description">Group Description</label>
          <input
            type="text"
            name="description"
            id="new-group-description"
            onChange={this.handleInputChange}
            value={this.state.newGroup.description}
          />
          <label htmlFor="new-group-routes">Group Routes</label>
          <input
            type="text"
            name="routes"
            id="new-group-routes"
            onChange={this.handleInputChange}
            value={this.state.newGroup.routes}
          />
          <label htmlFor="new-group-contact">Group Contact</label>
          <input
            type="text"
            name="contact"
            id="new-group-contact"
            onChange={this.handleInputChange}
            value={this.state.newGroup.contact}
          />
          <input className="button" type="submit" value="Add New Group" />
        </form>
      </div>
    );
  }
}
