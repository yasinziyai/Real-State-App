import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <ThreeDots
      visible={true}
      color="#304ffe"
      height={45}
      ariaLabel="three-dots-loading"
      wrapperStyle={{ margin: "auto" }}
    />
  );
}

export default Loader;
