import ReactDOM from "react-dom";
import React from "react";
import Mirador from "./Mirador";
import plugin from "./WebAnnotationsPlugin";

ReactDOM.render(
  <Mirador config={{ id: "mirador", windows: [{ manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/SeldenSupra57/manifest', canvasId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/SeldenSupra57/1r/canvas' }] }} plugins={[plugin]} />,
  document.getElementById("root")
);
