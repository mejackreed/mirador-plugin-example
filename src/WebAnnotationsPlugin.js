import React from "react";
import isEqual from 'lodash/isEqual';
import mirador from 'mirador';

// This component represents Mirador WindowTopBarPluginMenu isTemplateElement, 
// which takes the transcription of a canvas contained in a WebAnnotation
// and displays it in a popup
class WebAnnotationsTranscriptionPopupButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = { body: String };
      this.fetchAnnotations = this.fetchAnnotations.bind(this);
  }

  // Call fetchAnnotations() when rendered
  componentDidMount() {
      const { canvases } = this.props;
      this.fetchAnnotations(canvases);
  }

  // If the canvas changes, get the annotation for that canvas
  componentDidUpdate(prevProps) {
      const { canvases } = this.props;
      const currentCanvasIds = canvases.map(canvas => canvas.id);
      const prevCanvasIds = prevProps.canvases.map(canvas => canvas.id);
      if (!isEqual(currentCanvasIds, prevCanvasIds)) {
        console.log('fetching');
        this.fetchAnnotations(canvases);
      }
  }

  // Call for a single Web Annotation and store the transcription in the state
  fetchAnnotations(canvases) {
      const { config, fetchAnnotation } = this.props;
      canvases.forEach(canvas => {
          if (canvas) {
              const url = new URL(`${config.annotot.endpoint}/lists`);
              const params = {
                  uri: canvas.id,
              };
              url.search = new URLSearchParams(params);
              fetch(url, {
                  method: 'GET',
              }).then(res => res.json())
                .then((results) => {
                    fetchAnnotation(canvas.id, results['id'], results);
                    this.setState({
                       body: results.body[0].value
                   });
                }, (error) => {
                    console.log(error);
                });
          }
      });


      // fetch(
      //     "https://rosetest.library.jhu.edu/rosademo/wa/rose/SeldenSupra57/1r/canvas",
      //     {
      //         method: "GET",
      //         headers: {
      //             Accept: "application/json"
      //         }
      //     }
      // ).then(response => {
      //     if (response.ok) {
      //         response.json().then(json => {
      //             this.setState({
      //                 body: json.body[0].value
      //             });
      //         });
      //     }
      // });
  }

  // Return the transcription as viewable HTML
  render() {
      return (
          <div Style={"margin-right: 500px;"}  dangerouslySetInnerHTML={{__html: this.state.body}} />
      );
  }
}

function mapStateToProps(state, { targetProps }) {
  return {
    canvases: mirador.selectors.getSelectedCanvases(state, { windowId: targetProps.windowId }),
    config: state.config,
  };
};

const mapDispatchToProps = {
  fetchAnnotation: mirador.actions.fetchAnnotation
};


export default {
  name: "WebAnnotationsPlugin",
  target: "WindowTopBarPluginMenu",
  mode: "add",
  component: WebAnnotationsTranscriptionPopupButton,
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
};