import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth-context";

const Navigation = () => {
  const auth = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    auth.logout();
  };

  return (
    <header>
      <nav>
        <ul>
          {auth.isLoggedIn && (
            <li>
              <NavLink
                className="nav_links"
                activeClassName="active"
                to="/add-data"
              >
                Add Data
              </NavLink>
            </li>
          )}
          {auth.isLoggedIn && (
            <li>
              <NavLink
                className="nav_links"
                activeClassName="active"
                to="/get-data"
              >
                View Data
              </NavLink>
            </li>
          )}
          {auth.isLoggedIn && (
            <li>
              <button
                className="buttons"
                style={{ fontSize: "20px" }}
                type="submit"
                onClick={logoutHandler}
              >
                LogOut
              </button>
            </li>
          )}
          {!auth.isLoggedIn && (
            <li>
              <NavLink
                className="nav_links"
                activeClassName="active"
                to="/all-data"
                style={{ fontSize: "30px" }}
              >
                All Data
              </NavLink>
            </li>
          )}
          {!auth.isLoggedIn && (
            <li>
              <NavLink
                className="nav_links"
                activeClassName="active"
                style={{ fontSize: "30px" }}
                to="/"
                exact
              >
                Auth
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
