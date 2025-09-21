import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === key.charAt(0).toUpperCase() + key.slice(1)) {
          action();
          // console.log("Closing");
        }
      }

      document.addEventListener("keydown", callback);

      //when you write this code it means if the MovieDetails component is not open this effect doesn't render
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
