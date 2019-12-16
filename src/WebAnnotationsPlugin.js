import React from "react";
import isEqual from 'lodash/isEqual';
import mirador from 'mirador/dist/es/src/index';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

// This component represents the entire custom Mirador plugin
class WebAnnotationsTranscriptionPopupButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '' };
    this.fetchAnnotations = this.fetchAnnotations.bind(this);
    // this.show = false;
    // this.handleClose = this.handleClose.bind(this);
  }

  // This function loops through all the canvases and contructs and calls a new URL
  // that points to our Web Annotation endpoint. If there are no 
  // annotations for a given canvas, we display a message stating so.
  fetchAnnotations(canvases) {
    canvases.forEach(canvas => {
      if (canvas) {
        var iiifUrl = canvas.id;
        var url;
        // Check if the endpoint for the current canvas is a iiif or iiif3 endpoint
        if (iiifUrl.includes('iiif3')) {
          console.log('This is a iiif3 endpoint');
          try {
            url = new URL(canvas.id.replace('iiif3', 'wa'));
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log('This is a iiif endpoint');
          try {
            url = new URL(canvas.id.replace('iiif', 'wa'));
          } catch (e) {
            console.log(e);
          }
        }
        // Get Web Annotations with reconstructed URL
        fetch(url, {
          method: 'GET',
        }).then(res => res.json())
          .then((results) => {          
            if (results.body != undefined) {
              this.setState({
                body: results.body[0].value
              });
            } else { // Handle case where results has no body      
              this.setState({
                body: 'No annotations available'
              });
            }
        }, (error) => {
          console.log(error);
          this.setState({
            body: 'No annotations available'
          });
        });
      }
    });
  }

  //
  // handleClose () {
  //   this.setState({
  //     show: false
  //   });
  // }

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
      <div Style={"margin-right: 116px; margin-left: 16px;"}  dangerouslySetInnerHTML={{__html: this.state.body}} />
        // <>
        //   <Modal show={this.show} onHide={this.handleClose}>
        //     <Modal.Header closeButton>
        //       <Modal.Title>Web Annotations</Modal.Title>
        //     </Modal.Header>
        //     <Modal.body>
        //       {this.state.body}
        //     </Modal.body>
        //     <Modal.Footer>
        //       <Button variant="secondary" onClick={this.handleClose}>
        //         Close
        //       </Button>          
        //     </Modal.Footer>
        //   </Modal>
        // </>
    );
  }
} 

// Hook into Mirador's state to get the canvases
function mapStateToProps(state, { windowId }) {
  return {
    canvases: mirador.selectors.getVisibleCanvases(state, { windowId: windowId }),
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
