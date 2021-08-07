import React from "react";
import ScrollToTop from "react-scroll-up";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

export default function Scroll() {
  return (
    <div>
      <ScrollToTop showUnder={120} duration={400}>
        <ArrowUpwardIcon
          style={{
            color: "red",
            border: "1px solid red",
            padding: "3px",
            borderRadius: "10px",
          }}
          className="scrollUp"
        />
      </ScrollToTop>
    </div>
  );
}
