import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ManageProducts.css";

import { auth, db } from "../../firebase";
import { UserContext } from "../../store/userContext/UserContext";

function ManageProducts() {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [userProducts, setUserProducts] = useState([]);
  if (!user) {
    history.push("/Login");
  }
  useEffect(() => {
    if (user) {
      db.collection("products")
        .where("user_uid", "==", user?.uid)
        .onSnapshot((snapshot) =>
          setUserProducts(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
            }))
          )
        );
    } else {
      setUserProducts([]);
    }
  }, [user]);

  return (
    <div>
      <h1>Hi {user?.displayName}, your products are listed here</h1>
      {userProducts.map(({ data }) => {
        return (
          <div key={data.uid} className="userProduct">
            <img
              className="userProduct__image"
              src={data.images.imageUrl_01}
              alt="product"
            />
            <div className="userProduct__info">
              <h2 className="userProduct__title">{data.title}</h2>
              <h3 className="userProduct__price">
                <small>$</small>
                {data.price}
              </h3>
            </div>
            <div className="userProduct__buttons">
              <button className="userProduct__updateButton">
                Update this product
              </button>
              <button className="userProduct__removeButton">Remove</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ManageProducts;
