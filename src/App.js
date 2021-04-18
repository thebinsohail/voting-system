import "./App.css";
import Index from "./Components/Index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Ragister from "./Components/Ragister";
import Error from "./Components/Error";
import Voting from "./Components/Voting";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/ragister">
            <Ragister />
          </Route>
          <Route exact path="/voting">
            <Voting />
          </Route>
          <Route exact path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
