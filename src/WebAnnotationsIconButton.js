import React from "react";
import MaterialIcon from '@material/react-material-icon';
import './WebAnnotationsIconButtonStyles.css';

//TODO: add network call to WA endpoint
class WebAnnotationsIconButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    // Handle button click
    handleClick() {
        alert('Click!');
    }

    render() {
        return (
            <div id="WebAnnoContainer" class="tooltip">
                <MaterialIcon icon='class' onClick={this.handleClick} />
                <span class="tooltiptext">Web Annotations</span>
            </div>
        );
    }
}

export default WebAnnotationsIconButton;