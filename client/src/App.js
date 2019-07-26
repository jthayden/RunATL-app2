import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import AllNeighborhoods from './components/neighborhoods/AllNeighborhoods.js';
import SingleNeighborhood from './components/neighborhoods/SingleNeighborhood'
// import Routes from "./components/Routes";
// import SingleNeighborhood from "./components/SingleNeighborhood";
import SingleRoute from "./components/routes/SingleRoute";
import CreateRoute from './components/routes/CreateRoute'
import EditRoute from './components/routes/EditRoute'
// import Groups from "./components/Groups.js";
// import SingleGroup from "./components/SingleGroup.js";
import CreateNeighborhood from "./components/neighborhoods/CreateNeighborhood.js";
import EditNeighborhood from './components/neighborhoods/EditNeighborhood'
import EditGroup from './components/groups/EditGroup'
import CreateGroup from './components/groups/CreateGroup'
import SingleGroup from './components/groups/SingleGroup'
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path='/neighborhoods' component={AllNeighborhoods}/>
          <Route exact path='/neighborhoods/create' component={CreateNeighborhood}/>
          <Route
            exact
            path="/neighborhoods/:neighborhoodId"
            component={SingleNeighborhood}
          />
          <Route exact path='/neighborhoods/:neighborhoodId/edit' component={EditNeighborhood}/>
          <Route exact path="/routes/:routeId" component={SingleRoute} />
          <Route exact path='/routes/:neighborhoodId/create' component={CreateRoute}/>
          <Route exact path='/routes/:routeId/edit' component={EditRoute}/>
          <Route exact path='/groups/:groupId' component={SingleGroup}/>
          <Route exact path='/groups/:neighborhoodId/create' component={CreateGroup}/>
          <Route exact path='/groups/:groupId/edit' component={EditGroup}/>
          {/* <Route exact path="/routes" component={Routes} /> */}
          {/* <Route exact path="/groups" component={Groups} /> */}
          {/* <Route exact path="/groups/:groupId" component={SingleGroup} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

