import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";

import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import Logo from "../assets/logo__newish.png";

function Header() {
  const [user, setUser] = useState(auth.currentUser);

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
      setUser(null);
    }
  };

  auth.onAuthStateChanged(async (authUser) => {
    if (authUser && (user === undefined || !user)) {
      const u = await db.collection("users").doc(authUser.uid).get();
      return setUser(u.data());
    }
  });

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
        <Link to={"/Login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              {user ? user?.displayName : "Hello Guest"}
            </span>

            <span className="header__optionLineTwo">
              {user ? "Sign out" : "Sign In"}
            </span>
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
