import React from "react";
import WebAnnotationsTranscriptionPopupButton from "./WebAnnotationsIconButton";

// This component represents the entire custom Mirador plugin
const WebAnnotationsPlugin = props => {
  // console.log(props);
  return <div id="WebAnnotationsPlugin">
    {/* <props.TargetComponent {...props.targetProps} /> */}
    <WebAnnotationsTranscriptionPopupButton />
  </div>;
};

export default {
  name: "WebAnnotationsPlugin",
  target: "WindowTopBarPluginMenu",
  mode: "add",
  component: WebAnnotationsPlugin
};