import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        margin: "50px auto",
        justifyContent: "center",
      }}
    >
      <CircularProgress style={{ color: "red" }} />
    </div>
  );
}
