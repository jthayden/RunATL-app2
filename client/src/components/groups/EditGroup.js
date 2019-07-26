import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class EditGroup extends Component {
  state = {
    route: {},
    redirectToHome: false
  };

  componentDidMount() {
    axios.get(`/api/groups/${this.props.match.params.groupId}`).then(res => {
      this.setState({ group: res.data });
    });
  }

  handleInputChange = event => {
    const copiedGroup = { ...this.state.group };
    copiedGroup[event.target.name] = event.target.value;
    this.setState({ group: copiedGroup });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`/api/groups/${this.state.group._id}`, this.state.group)
      .then(res => {
        this.setState({
          group: res.data
        });
        this.setState({ redirectToHome: true });
      });
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to={`/groups/${this.state.group._id}`} />;
    }
    return (
      <div>
        <h1>Edit Group</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="group-name">Group Name</label>
          <input
            type="text"
            name="name"
            id="group-name"
            onChange={this.handleInputChange}
            value={this.state.group.name}
          />
          <label htmlFor="group-description">Group Description</label>
          <input
            type="text"
            name="description"
            id="group-description"
            onChange={this.handleInputChange}
            value={this.state.group.description}
          />
          <label htmlFor="group-routes">Group Routes</label>
          <input
            type="text"
            name="routes"
            id="group-routes"
            onChange={this.handleInputChange}
            value={this.state.group.routes}
          />
          <label htmlFor="group-contact">Group Contact</label>
          <input
            type="text"
            name="contact"
            id="group-contact"
            onChange={this.handleInputChange}
            value={this.state.group.contact}
          />
          <input className="button" type="submit" value="Edit Group" />
        </form>
      </div>
    );
  }
}
