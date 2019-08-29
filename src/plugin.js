import React from "react";

const DemoComponent = props => {
  console.log(props);
  return <div id="add-plugin-component-anything">Hello World!</div>;
};

export default {
  name: "Demo",
  target: "WindowTopBarPluginMenu",
  mode: "add",
  component: DemoComponent
};
