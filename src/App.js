import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./components/UserContext";
import { auth, db } from "./firebase";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import AddProduct from "./pages/AddProduct";

function App() {
  const [user, setUser] = useState(auth.currentUser);
  auth.onAuthStateChanged(async (authUser) => {
    if (authUser && (user === undefined || !user)) {
      console.log(authUser);
      const u = await db.collection("users").doc(authUser.uid).get();
      return setUser(u.data());
    }
  });
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={[user, setUser]}>
          <Header />
          <Navbar />
          <Switch>
            <Route path="/AddProduct" component={AddProduct} />
            <Route path="/RegisterUser" component={RegisterUser} />
            <Route path="/Login" component={Login} />
            <Route path="/ProductDetail" component={ProductDetail} />
            <Route exact path="/" component={Home} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
