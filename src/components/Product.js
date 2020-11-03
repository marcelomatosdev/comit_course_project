import React from "react";
import "./Product.css";

function Product({ id, title, image, price }) {
  return (
    <div className="product">
      <img src={image} alt="" />
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
    </div>
  );
}

export default Product;
