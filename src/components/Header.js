import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import Logo from "../assets/logo__newish.png";

function Header() {
  return (
    <div className="header">
      <div className="header__logoContainer">
        <Link to="/">
          <img className="header__logo" src={Logo} alt="Newish Logo" />
        </Link>
      </div>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to="/Login">
          <div className="header__option">
            <span className="header__optionLineOne">Hello Guest</span>

            <span className="header__optionLineTwo">Sign in</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">My</span>
          <span className="header__optionLineTwo">Selection</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Sell</span>
          <span className="header__optionLineTwo">Newish</span>
        </div>
        <div className="header__optionChat">
          <ChatIcon className="optionChat__icon" />
          <span className="header__optionLineTwo header__chatCount">6</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
