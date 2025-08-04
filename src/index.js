import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="green" onMovieRating={setMovieRating} maxRating={10} />
      <p>
        This movie is rated {movieRating} {movieRating <= 1 ? "star" : "stars"}
      </p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />

    {/* <StarRating
      maxRating={5}
      handleColor={["red", "orange", "yellow", "blue", "green"]}
    />
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating maxRating={10} color="blue" size="64" />
    <StarRating maxRating={15} color="red" className="test" defaultRating={3} />
    <Test /> */}
  </React.StrictMode>
);
