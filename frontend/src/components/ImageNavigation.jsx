import React from "react";
import { Link } from "react-router-dom";

export default function ImageNavigation() {
  const imagePaths = [
    "./assets/home.png",
    "./assets/home.png",
    "./assets/home.png",
  ];

  return (
    <div className="image-navigation">
      {imagePaths.map((path, index) => (
        <Link to={`/page/${index + 1}`} key={index} className="image-link">
          <img src={path} alt={`Image ${index + 1}`} />
        </Link>
      ))}
    </div>
  );
}
