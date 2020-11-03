import React from "react";
import "./Home.css";
import Banner_img from "../assets/banner_gray.jpg";
import Product from "../components/Product";
import { featured, mac, ipad, iphone } from "../assets/product_example";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src={Banner_img} alt="top banner" />
        <div className="home__featured">
          <div className="home__featured__title">
            <h3>Featured</h3>
          </div>
          <div className="home__featured__products">
            {featured.productDetails.map((item) => (
              <Product
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
        </div>
        <div className="home__row">
          <div className="home__row__title">
            <h3>Mac</h3>
          </div>
          <div className="home__row__products">
            {mac.productDetails.map((item) => (
              <Product
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
        </div>
        <div className="home__row">
          <div className="home__row__title">
            <h3>iPad</h3>
          </div>
          <div className="home__row__products">
            {ipad.productDetails.map((item) => (
              <Product
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
        </div>
        <div className="home__row">
          <div className="home__row__title">
            <h3>iPhone</h3>
          </div>
          <div className="home__row__products">
            {iphone.productDetails.map((item) => (
              <Product
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
