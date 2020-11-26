import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./components/userContext/UserContext";
import { auth, db } from "./firebase";

import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Login from "./pages/login/Login";
import RegisterUser from "./pages/registerUser/RegisterUser";
import AddProduct from "./pages/addProduct/AddProduct";

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
