import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useAuthListener from "./Hooks/use-auth-listener";
import UserContext from "./Context/user";
import ProtectedRoute from "./Helpers/protected-route";

const Header = lazy(() => import("./Components/Header"));
const Index = lazy(() => import("./Components/Index"));
const Login = lazy(() => import("./Components/Login"));
const Ragister = lazy(() => import("./Components/Ragister"));
const Error = lazy(() => import("./Components/Error"));
const Voting = lazy(() => import("./Components/Voting"));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <div className="App">
        <Router>
          <Suspense fallback={<div class="loader"></div>}>
            <Header />
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
