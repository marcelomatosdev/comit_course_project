import React, { useState } from "react";
import "./Navbar.css";
import SubNavbar from "./SubNavbar";

function Navbar() {
  const [showSubNavbar, setShowSubNavbar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleNavClick(e) {
    e.preventDefault();

    setSelectedCategory(
      document.getSelection("navbar__optionLineOne").focusNode.data
    );

    setShowSubNavbar(
      showSubNavbar
        ? selectedCategory ===
          document.getSelection("navbar__optionLineOne").focusNode.data
          ? false
          : true
        : true
    );
  }
  console.log(showSubNavbar);
  console.log(selectedCategory);

  return (
    <>
      <div className="navbar">
        <div className="navbar__options">
          <div className="navbar__option">
            <span onClick={handleNavClick} className="navbar__optionLineOne">
              Mac
            </span>
          </div>
          <div className="navbar__option">
            <span onClick={handleNavClick} className="navbar__optionLineOne">
              iPad
            </span>
          </div>
          <div className="navbar__option">
            <span className="navbar__optionLineOne">iPhone</span>
          </div>
          <div className="navbar__option">
            <span className="navbar__optionLineOne">Watch</span>
          </div>
          <div className="navbar__option">
            <span className="navbar__optionLineOne">TV</span>
          </div>
          <div className="navbar__option">
            <span className="navbar__optionLineOne">iPod</span>
          </div>
          <div className="navbar__option">
            <span className="navbar__optionLineOne">Vintage</span>
          </div>
          <div className="navbar__option">
            <span className="navbar__optionLineOne">Services</span>
          </div>
        </div>
      </div>
      <SubNavbar
        selectedCategory={selectedCategory}
        isVisible={showSubNavbar}
      />
    </>
  );
}

export default Navbar;
