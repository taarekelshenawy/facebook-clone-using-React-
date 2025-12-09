import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

export default function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <FadeLoader color="#36d7b7" loading={true} size={150} />
    </div>
  );
}
