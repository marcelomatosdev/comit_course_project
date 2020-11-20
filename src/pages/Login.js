import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="container">
      <div className="login">
        <div className="login__signIn">
          <h2>Sign in</h2>
          <form>
            <h3>Email</h3>
            <input
              type="email"
              placeholder="Please enter your registered email"
            />
            <h3>Password</h3>
            <input type="password" placeholder="Enter your password" />
            <button>Sign in</button>
          </form>
        </div>
        <div className="login__register">
          <h2>Not registered yet?</h2>
          <h3>Register now to sell your products or contact a seller.</h3>
          <button>Register Now</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
