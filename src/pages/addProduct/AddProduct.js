import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./AddProduct.css";

import { UserContext } from "../../components/userContext/UserContext";

function AddProduct() {
  const history = useHistory();

  const [user, setUser] = useContext(UserContext);
  if (!user) {
    history.push("/Login");
  }

  return <div>{user ? user.displayName : "none"}</div>;
}

export default AddProduct;
