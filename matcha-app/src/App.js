import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.sass";

import Register from "./components/register-component.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Register} />
      </div>
    </Router>
  );
}

export default App;
