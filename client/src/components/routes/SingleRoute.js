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
         <ul className="navigation">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/neighborhoods">Neighborhoods</a>
          </li>
          <li>
            <a href={`/routes/${this.state.route._id}/edit`}>
              Edit Route
            </a>
          </li>
          <li>
            <a onClick={this.handleDelete}>Delete Route</a>
          </li>
        </ul>
        <Link to={`/neighborhoods/${this.state.route.neighborhoodId}`}>
          Back to Neighborhood
        </Link>
        <h2>Route</h2>
        <h2>{this.state.route.name} </h2>
        <img src={this.state.route.image} />
        <p>{this.state.route.description} </p>
        <p>Distance:{this.state.route.distance} miles </p>
        <p>Rating:{this.state.route.rating} </p>
        <iframe className='route-map' src={this.state.route.routeLink}  />
        </div>
    );
  }
}
