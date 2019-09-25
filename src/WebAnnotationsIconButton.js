import React from "react";
import MaterialIcon from '@material/react-material-icon';
import './WebAnnotationsIconButtonStyles.css';

class WebAnnotationsIconButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { responseText: Object };
        this.fetchWebAnnotations = this.fetchWebAnnotations.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.fetchWebAnnotations();
    }

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
                        responseText: json
                    });
                });
            }
        });
    }

    // Handle button click
    handleClick() {
        alert(JSON.stringify(this.state.responseText))
    }

    render() {
        return (
            <div id="WebAnnoContainer" class="tooltip" onClick={this.handleClick}>
                <MaterialIcon icon='class' />
                <span class="tooltiptext">Web Annotations</span>
            </div>
        );
    }
}

export default WebAnnotationsIconButton;