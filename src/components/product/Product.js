import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

function Product({ id, title, image, price }) {
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div className="product">
      <Link to={`/productDetail/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div className="product__info">
        <hr />
        <p>{truncate(title, 40)}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
    </div>
  );
}

export default Product;
