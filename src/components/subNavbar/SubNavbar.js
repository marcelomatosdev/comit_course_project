import React from "react";
import "./SubNavbar.css";
import { mac, ipad } from "../../assets/subNavbar__options";

function SubNavbar({ selectedCategory, isVisible }) {
  selectedCategory = selectedCategory?.toLowerCase();
  switch (selectedCategory) {
    case "mac":
      selectedCategory = mac;
      break;
    case "ipad":
      selectedCategory = ipad;
      break;
    default:
      break;
  }

  return (
    <div
      className="subnavbar"
      style={{
        display: isVisible ? "" : "none",

        // visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <div className="subnavbar__options">
        {selectedCategory &&
          selectedCategory.navTitleAndFigure.map((figure) => (
            <div className="subnavbar__option">
              <figure
                className="subnavbar__figure"
                style={{
                  "background-image": `url(${figure[1]})`,
                }}
              ></figure>
              <span className="subnavbar__optionLineOne">{figure[0]}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SubNavbar;
