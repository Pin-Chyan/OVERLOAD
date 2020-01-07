import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.sass";

import Register from "./components/register-component.js";
import Home from "./components/home-component.js";
import Login from "./components/login-component.js";
import User from "./components/user-component.js";
import Edit from "./components/edit-component.js";
import Test from "./components/test-component.js";
import upload from "./components/upload.js";
import Authenticated from "./components/auth-component.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/auth" component={Authenticated } />
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/user" exact component={User} />
        <Route path="/edit" exact component={Edit} />
        <Route path="/test" exact component={Test} />
        <Route path="/upload" exact component={upload} />
      </div>
    </Router>
  );
}

export default App;
