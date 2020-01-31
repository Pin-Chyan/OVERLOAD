import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.sass";

import Register from "./components/register-component.js";
import Home from "./components/home-component.js";
import Login from "./components/login-component.js";
import User from "./components/user-component.js";
import Edit from "./components/edit-component.js";
import NewEdit from "./components/newedit-component.js";
import Authenticate from "./components/auth/auth-component.js";
import invite from "./components/invite-component.js";
import chat from "./components/chat-component.js";
import logout from "./components/auth/logout";
import Verify from  "./components/auth/verify-component.js";
import Forgot from "./components/forgot-component.js";
import EmailSent from "./components/emailSent-component.js";
import ResetPass from "./components/resetPass-component.js";
import PasswordUpdated from "./components/passwordUpdated-component";
import Search from "./components/search-component.js";
import Profiles from "./components/profiles-component.js";
import Notification from "./components/notification-component.js";
import ChatPage from "./components/chatpage-component.js";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/newedit" exact component={NewEdit} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/invite" exact component={invite} />
        <Route path="/logout" exact component={logout} />
        <Route path="/forgot" exact component={Forgot} />
        <Route path="/emailSent" exact component={EmailSent} />
        <Route path="/verify/:vkey" component={Verify}/>
        <Route path="/resetPass/:vkey" component={ResetPass}/>
        <Route path="/passwordUpdated" component={PasswordUpdated}/>
        <Route path="/verify/:vkey" component={Verify}/>
        <Authenticate>
          <Route path="/notification" exact component={Notification} />
          <Route path="/mychats" exact component={ChatPage} />
          <Route path="/profiles/:id" component={Profiles}/>
          <Route path="/chat/:target" exact component={chat} />
          <Route path="/user" exact component={User} />
          <Route path="/logout" exact component={logout} />
          <Route path="/search" exact component={Search}/>
          <Route path="/" exact component={Home}/>
          <Route path="/edit" exact component={Edit} />
        </Authenticate>
      </Switch>
    </Router>
  )
}

export default App;