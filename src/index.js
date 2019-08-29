import ReactDOM from "react-dom";
import React from "react";
import Mirador from "./Mirador";
import plugin from "./plugin";

ReactDOM.render(
  <Mirador config={{ id: "mirador" }} plugins={[plugin]} />,
  document.getElementById("root")
);
