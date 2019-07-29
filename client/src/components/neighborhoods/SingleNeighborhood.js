import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import EditNeighborhood from "./EditNeighborhood.js";
import SingleRoute from "../routes/SingleRoute";
import { Card, CardDeck } from 'react-bootstrap'

export default class SingleNeighborhood extends Component {
  state = {
    neighborhood: {},
    redirectToHome: false,
    routes: [],
    // groups: []
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
    //Not using groups now. Future implementation.  
    // axios
    //   .get(
    //     `/api/groups/byNeighborhoodId/${this.props.match.params.neighborhoodId}`
    //   )
    //   .then(res => {
    //     this.setState({ groups: res.data });
    //   });
  }

  handleDelete = () => {
    axios
      .delete(`/api/neighborhoods/${this.state.neighborhood._id}`)
      .then(() => {
        this.setState({ redirectToHome: true });
      });
  };


  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/neighborhoods" />;
    }
    let routeArr = this.state.routes.map(singleRoute => {
      return (
        <div>
          <Link
            className='route-card'
            key={singleRoute._id}
            to={`/routes/${singleRoute._id}`}
            name={singleRoute.name}
            description={singleRoute.description}
            s
            distance={singleRoute.distance}
            rating={singleRoute.rating}
            image={singleRoute.image}
            routeLink={singleRoute.routeLink}
            >
            <CardDeck style={{ width: "300px", height: "350px" }}>
              <Card>
              <Card.Img variant="top" src={singleRoute.image} />
              <Card.Body>
                <Card.Title>{singleRoute.name}</Card.Title>
                <Card.Text>{singleRoute.description}{singleRoute.distance}</Card.Text>
                </Card.Body> 

              </Card>
              </CardDeck> 
          </Link>
        </div>
      );
    });
    // Not using group yet.
    // let groupArr = this.state.groups.map(singleGroup => {
    //   return (
    //     <div>
    //       <Link
    //         key={singleGroup._id}
    //         to={`/groups/${singleGroup._id}`}
    //         name={singleGroup.name}
    //         description={singleGroup.description}
    //         routes={singleGroup.routes}
    //         contact={singleGroup.contact}
    //       >
    //         {singleGroup.name}
    //       </Link>
    //     </div>
    //   );
    //   console.log(groupArr)
    // });
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
            <a href={`/neighborhoods/${this.state.neighborhood._id}/edit`}>
              Edit Neighborhood
            </a>
          </li>
          <li>
            <a onClick={this.handleDelete}>Delete Neighborhood</a>
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
        <div className='route-card-container'>{routeArr}</div>

        {/* <h2>Groups:</h2>
        <Link to={`/groups/${this.state.neighborhood._id}/create`}>
          Add a Group
        </Link>
        <div>{groupArr}</div> */}
      </div>
    );
  }
}
