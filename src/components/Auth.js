import { Fragment, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import AuthContext from "../context/auth-context";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const [emailVaild, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [login, setLogin] = useState(false);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const authHanlder = (e) => {
    e.preventDefault();
    if (email !== "test@test.com" || password !== "testing") {
      setEmailValid(false);
      setPasswordValid(false);
      console.log("Failed");
      return;
    }
    setEmailValid(true);
    setLogin(true);
    auth.login();
  };

  return (
    <Fragment>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "wheat",
          fontSize: "40px",
        }}
      >
        Authentication
      </h1>
      <hr></hr>
      <form className="addData_form">
        <div>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              placeholder="Enter test@test.com"
              required
              onChange={emailHandler}
            />
          </label>
        </div>
        {!emailVaild && (
          <p style={{ padding: "0px 20px", color: "red" }}>
            Please Enter valid email.
          </p>
        )}
        <div>
          <label htmlFor="password">
            <input
              type="text"
              id="password"
              placeholder="Enter testing"
              required
              onChange={passwordHandler}
            />
          </label>
        </div>
        {!passwordValid && (
          <p style={{ padding: "0px 20px", color: "red" }}>
            Please Enter valid Password.
          </p>
        )}
        <div>
          <button className="buttons" type="submit" onClick={authHanlder}>
            Add Data
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Auth;
