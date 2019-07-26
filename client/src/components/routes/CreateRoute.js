import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import SingleNeighborhood from '../neighborhoods/SingleNeighborhood'

export default class CreateRoute extends Component {
  state = {
    newRoute: {
        name:'',
        description:'',
        distance:'',
        rating:'',
        neighborhoodId: ''
    },
    redirectToHome: false
  };

  componentDidMount() {
      const idRoute = {...this.state.newRoute}
      idRoute.neighborhoodId = this.props.match.params.neighborhoodId
      this.setState({newRoute: idRoute })
    // this.getAllRoutes();
  }

//   getAllRoutes = () => {
//     axios.get("/api/routes").then(res => {
//       this.setState({ routes: res.data });
//     });
//   };

  handleInputChange = event => {
    // event.preventDefault();
    const copiedRoute = { ...this.state.newRoute };
    copiedRoute[event.target.name] = event.target.value;
    this.setState({ newRoute: copiedRoute });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios.post(`/api/routes/byNeighborhoodId/${this.props.match.params.neighborhoodId}`, this.state.newRoute).then(() => {
      this.setState({ redirectToHome: true });
    //   this.getAllRoutes();
    });
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to={`/neighborhoods/${this.state.newRoute.neighborhoodId}`} />;
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
        <input className="button" type="submit" value="Add New Route" />
      </form>
      </div>
    );
  }
}
