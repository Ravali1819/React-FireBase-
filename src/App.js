import { Fragment, useState, useCallback } from "react";
import { Switch, Route, Redirect } from "react-router";
import "./App.css";
import AddData from "./components/AddData";
import MainPage from "./components/MainPage";
import Navigation from "./components/Navigation";
import Auth from "./components/Auth";
import AuthContext from "./context/auth-context";
import AllData from "./components/AllData";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/add-data">
          <AddData />
        </Route>
        <Route path="/get-data">
          <MainPage />
        </Route>
        <Route path="/update-data/:updateId">
          <MainPage />
        </Route>
        <Redirect to="/get-data">
          <MainPage />
        </Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/all-data">
          <AllData />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Navigation />
      <main>{routes}</main>
    </AuthContext.Provider>
  );
}

export default App;
