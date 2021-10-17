import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

import Login from "./Components/account/login";
import SignUp from "./Components/account/SignUp";
import Dashboard from "./Components/user/dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Login />
        </Route>
        <Route  path="/sign-up">
            <SignUp />
        </Route>
        <Route  path="/:id/dashboard">
            <Dashboard />
        </Route>
        <Route  path="/:id/update">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
