import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import EditNeighborhood from "./EditNeighborhood.js";
import SingleRoute from "../routes/SingleRoute";

export default class SingleNeighborhood extends Component {
  state = {
    neighborhood: {},
    redirectToHome: false,
    routes: [],
    groups: []
  };

  componentDidMount() {
    axios
      .get(`/api/neighborhoods/${this.props.match.params.neighborhoodId}`)
      .then(res => {
        this.setState({ neighborhood: res.data });
      });
    axios
      .get(
        `/api/routes/byNeighborhoodId/${this.props.match.params.neighborhoodId}`
      )
      .then(res => {
        this.setState({ routes: res.data });
      });
    axios
      .get(
        `/api/groups/byNeighborhoodId/${this.props.match.params.neighborhoodId}`
      )
      .then(res => {
        this.setState({ groups: res.data });
      });
  }

  handleDelete = () => {
    axios
      .delete(`/api/neighborhoods/${this.state.neighborhood._id}`)
      .then(() => {
        this.setState({ redirectToHome: true });
      });
  };

//   getAllRoutes() {
//     axios.get(`/api/neighborhoods/${this.state.neighborhood._id}`).then(res => {
//       this.setState({ routes: res.data });
//     });
//   }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/neighborhoods" />;
    }
    let routeArr = this.state.routes.map(singleRoute => {
      return (
        <div>
          <Link
            to={`/routes/${singleRoute._id}`}
            name={singleRoute.name}
            description={singleRoute.description}
            s
            distance={singleRoute.distance}
            rating={singleRoute.rating}
            image={singleRoute.image}
            routeLink={singleRoute.routeLink}
          >
            {singleRoute.name}
          </Link>
        </div>
      );
    });

    let groupArr = this.state.groups.map(singleGroup => {
      return (
        <div>
          <Link
            to={`/groups/${singleGroup._id}`}
            name={singleGroup.name}
            description={singleGroup.description}
            routes={singleGroup.routes}
            contact={singleGroup.contact}
          >
            {singleGroup.name}
          </Link>
        </div>
      );
    });
    return (
      <div>
        <ul class="navigation">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/neighborhoods">Neighborhoods</a>
          </li>
          <li>
            <a href={`/neighborhoods/${this.state.neighborhood._id}/edit`}>
              Edit
            </a>
          </li>
          <li>
            <a onClick={this.handleDelete}>Delete</a>
          </li>
        </ul>
        <h1>Neighborhood:</h1>
        {/* <Link to={`/neighborhoods/${this.state.neighborhood._id}/edit`}>
          Edit Neighborhood
        </Link> */}
        {/* <button onClick={this.handleDelete}>Delete Neighborhood</button> */}
        <h2>{this.state.neighborhood.name}</h2>
        <p>{this.state.neighborhood.description}</p>
        <img src={this.state.neighborhood.image} />

        {/* <button>
          <a href="/neighborhoods">Back to Neighborhoods</a>
        </button> */}

        <h2>Routes:</h2>

        <Link to={`/routes/${this.state.neighborhood._id}/create`}>
          Add a Route
        </Link>
        <div>{routeArr}</div>

        <h2>Groups:</h2>
        <Link to={`/groups/${this.state.neighborhood._id}/create`}>
          Add a Group
        </Link>
        <div>{groupArr}</div>
      </div>
    );
  }
}
