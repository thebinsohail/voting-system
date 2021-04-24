import { Suspense } from "react";
import "./App.css";
import Index from "./Components/Index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Ragister from "./Components/Ragister";
import Error from "./Components/Error";
import Voting from "./Components/Voting";
import useAuthListener from "./Hooks/use-auth-listener";
import UserContext from "./Context/user";
import ProtectedRoute from "./Helpers/protected-route";

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <div className="App">
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
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
              <ProtectedRoute user={user} path="/voting" exact>
                <Voting />
              </ProtectedRoute>
              <Route exact path="*">
                <Error />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
