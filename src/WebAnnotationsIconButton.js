import React from "react";
import './WebAnnotationsIconButtonStyles.css';
import { isTemplateElement, anyTypeAnnotation } from "@babel/types";

// This component represents Mirador WindowTopBarPluginMenu isTemplateElement, 
// which takes the transcription of a canvas contained in a WebAnnotation
// and displays it in a popup
class WebAnnotationsTranscriptionPopupButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { body: String };
        this.fetchWebAnnotations = this.fetchWebAnnotations.bind(this);
    }

    // Call fetchWebAnnotations() when rendered
    componentDidMount() {
        this.fetchWebAnnotations();
    }

    // Call for a single Web Annotation and store the transcription in the state
    fetchWebAnnotations() {
        fetch(
            "https://rosetest.library.jhu.edu/rosademo/wa/rose/SeldenSupra57/1r/canvas",
            {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({
                        body: json.body[0].value
                    });
                });
            }
        });
    }

    // Return the transcription as viewale HTML
    render() {
        return (
            <div Style={"margin-right: 500px;"}  dangerouslySetInnerHTML={{__html: this.state.body}} />
        );
    }
}

export default WebAnnotationsTranscriptionPopupButton;