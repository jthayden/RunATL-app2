import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardDeck, Button } from "react-bootstrap";

export default class Neighborhoods extends Component {
  state = {
    neighborhoods: [],
    newNeighborhood: {
      name: "",
      description: "",
      image: ""
    }
  };

  componentDidMount() {
    this.getAllNeighborhoods();
  }

  getAllNeighborhoods = () => {
    axios.get("/api/neighborhoods").then(res => {
      this.setState({ neighborhoods: res.data });
    });
  };

  render() {
    let neighborhoodsList = this.state.neighborhoods.map(neighborhood => {
      return (
        <Link
          className="neighborhood-card"
          key={neighborhood._id}
          to={`/neighborhoods/${neighborhood._id}`}
        >
          <CardDeck style={{ width: "300px", height: "350px" }}>
            <Card>
              <Card.Img variant="top" src={neighborhood.image} />
              <Card.Body>
                <Card.Title>{neighborhood.name}</Card.Title>
                <Card.Text>{neighborhood.description}</Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
        </Link>
      );
    });
    return (
      <div>
        <ul className="navigation">
          <li>
            <Button variant='outline-success' href="/">Home</Button>
          </li>
          <li>
          <Button variant='outline-success' href="#">About</Button>
          </li>
        </ul>
        <h1>Neighborhoods</h1>
        <div className="neighborhoods-container">{neighborhoodsList}</div>
        <Button variant='outline-success'><Link to={"/neighborhoods/create"}>Add Neighborhood</Link></Button>
      </div>
    );
  }
}
