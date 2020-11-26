import React, { useState } from "react";
import "./RegisterUser.css";

import { auth, db } from "../../firebase";
import { useHistory } from "react-router-dom";

function RegisterUser() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  if (auth.currentUser) {
    history.push("/");
  }

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (auth) => {
        auth.user.updateProfile({
          displayName: displayName,
        });
        if (auth) {
          await db.collection("users").doc(auth.user.uid).set({
            uid: auth.user.uid,
            email: email,
            displayName: displayName,
          });
        }
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="container">
      <div className="registerUser">
        <div className="registerUser__container">
          <h2>Register</h2>
          <form>
            <h3>Email Address</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your email"
            />
            <h3>Name</h3>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Please enter your first and last name"
            />
            <h3>Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create your password"
            />
            <button type="submit" onClick={register}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
