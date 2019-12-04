import React from "react";
import isEqual from 'lodash/isEqual';
import mirador from 'mirador/dist/es/src/index';

// This component represents the entire custom Mirador plugin
class WebAnnotationsTranscriptionPopupButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '' };
    this.fetchAnnotations = this.fetchAnnotations.bind(this);
  }

  // This function loops through all the canvases and contructs and calls a new URL
  // that points to our Web Annotation endpoint. If there are no 
  // annotations for a given canvas, we display a message stating so.
  fetchAnnotations(canvases) {
    canvases.forEach(canvas => {
      if (canvas) {
        const url = new URL(canvas.id.replace('iiif3', 'wa'));
        fetch(url, {
          method: 'GET',
        }).then(res => res.json())
          .then((results) => {
            console.log(results);
            this.setState({
              body: results.body[0].value
            });
        }, (error) => {
          console.log(error);
          this.setState({
            body: 'No annotations available'
          });
        });
      }
    });
  }

  componentDidMount() {
    const { canvases } = this.props;
    this.fetchAnnotations(canvases);
  }

  componentDidUpdate(prevProps) {
    const { canvases } = this.props;
    const currentCanvasIds = canvases.map(canvas => canvas.id);
    const prevCanvasIds = prevProps.canvases.map(canvas => canvas.id);
    if (!isEqual(currentCanvasIds, prevCanvasIds)) {
      console.log('fetching');
      this.fetchAnnotations(canvases);
    }
  }

  // Turn the Web Annotation's transcription into viewable HTML
  render() {
    return (
        <div Style={"margin-right: 500px;"}  dangerouslySetInnerHTML={{__html: this.state.body}} />
    );
  }
} 

// Hook into Mirador's state to get the canvases
function mapStateToProps(state, { windowId }) {
  return {
    canvases: mirador.selectors.getSelectedCanvases(state, { windowId: windowId }),
    config: state.config,
  };
};

export default {
  name: "WebAnnotationsTranscriptionPopupButton",
  target: "WindowTopBarPluginMenu",
  mode: "add",
  component: WebAnnotationsTranscriptionPopupButton,
  mapStateToProps: mapStateToProps,
};
