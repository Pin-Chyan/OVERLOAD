import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.sass";

import Register from "./components/register-component.js";
import Home from "./components/home-component.js";
import Login from "./components/login-component.js";
import User from "./components/user-component.js";
import Edit from "./components/edit-component.js";
import upload from "./components/upload.js";
import Authenticate from "./components/auth/auth-component.js";
import Protected from './components/protected-component';
import msg from "./components/message-and-notification.js";
// import tags from "./components/tags-input.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Authenticate>
          <Route path="/" exact component={Home} />
          <Route path="/user" exact component={User} />
          <Route path="/edit" exact component={Edit} />
          <Route path="/upload" exact component={upload} />
          <Route path="/msg" exact component={msg} />
        </Authenticate>
        {/* <Route path="/tags" exact component={tags} /> */}        
      </Switch>
    </Router>
  );
}

export default App;
