import React from "react";
import WebAnnotationsIconButton from "./WebAnnotationsIconButton";

const WebAnnotationsPlugin = props => {
  console.log(props);
  return <div id="WebAnnotationsPlugin">
    <WebAnnotationsIconButton />
  </div>;
};

export default {
  name: "WebAnnotationsPlugin",
  target: "WorkspaceControlPanelButtons",
  mode: "add",
  component: WebAnnotationsPlugin
};
