import ReactDOM from "react-dom";
import React from "react";
import Mirador from "./Mirador";
import plugin from "./WebAnnotationsPlugin";

ReactDOM.render(
  <Mirador config={{ 
    id: "mirador", 
    windows: [{ 
        manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/SeldenSupra57/manifest', 
        canvasId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/SeldenSupra57/1r/canvas' 
      }] ,
    themes:{
       dark: {
          palette: {
            type: 'dark',
            primary: {
              main: '#3F51B5',
            },
            secondary: {
              main: '#536dfe',
            }
          }
       },
       light: {
        palette: {
          type: 'light',
          primary: {
            main: '#3F51B5',
          },
          secondary: {
            main: '#536dfe',
          }
        }
     }  
    }
    }} plugins={[plugin]} />,
  document.getElementById("root")
);
