import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useAuthListener from "./Hooks/use-auth-listener";

const Header = lazy(() => import("./Components/Header"));
const Index = lazy(() => import("./Components/Index"));
const Login = lazy(() => import("./Components/Login"));
const Ragister = lazy(() => import("./Components/Ragister"));
const Error = lazy(() => import("./Components/Error"));
const Voting = lazy(() => import("./Components/Voting"));
const Result = lazy(() => import("./Components/Result"));

function App() {
  const { user } = useAuthListener();
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div className="loader"></div>}>
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
            <Route exact path="/voting">
              {user ? <Voting /> : <Login />}
            </Route>
            <Route exact path="/result">
              <Result />
            </Route>
            <Route exact path="*">
              <Error />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
