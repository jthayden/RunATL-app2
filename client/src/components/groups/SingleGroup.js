import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

export default class SingleGroup extends Component {
  state = {
    group: [],
    redirectToHome: false
  };

  componentDidMount() {
    axios.get(`/api/groups/${this.props.match.params.groupId}`).then(res => {
      this.setState({ group: res.data });
    });
  }

  handleDelete = () => {
    axios.delete(`/api/groups/${this.props.match.params.groupId}`).then(res => {
      this.setState({ redirectToHome: true });
    });
  };

  render() {
    if (this.state.redirectToHome) {
      return (
        <Redirect to={`/neighborhoods/${this.state.route.neighborhoodId}`} />
      );
    }
    return (
      <div>
        {/* <Link to={`/neighborhoods/${this.state.route.neighborhoodId}`}>
          Back to Neighborhood
        </Link> */}
        <h2>Group</h2>
        <p>{this.state.group.name}</p>
        <p>{this.state.group.description}</p>
        <p>{this.state.group.routes}</p>
        <p>{this.state.group.contact}</p>
        <button onClick={this.handleDelete}>Delete Group</button>
        <Link to={`/groups/${this.state.group._id}/edit`}>Edit Group</Link>
      </div>
    );
  }
}
