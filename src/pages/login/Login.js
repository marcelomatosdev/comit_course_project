import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.currentUser) {
    history.push("/");
  }

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="container">
      <div className="login">
        <div className="login__signIn">
          <h2>Sign in</h2>
          <form>
            <h3>Email</h3>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your registered email"
            />
            <h3>Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button type="submit" onClick={signIn}>
              Sign in
            </button>
          </form>
        </div>
        <div className="login__register">
          <h2>Not registered yet?</h2>
          <h3>Register now to sell your products or contact a seller.</h3>
          <Link to="/RegisterUser">
            <button type="button">Register Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
