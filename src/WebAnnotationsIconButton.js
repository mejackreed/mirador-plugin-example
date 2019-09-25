import React from "react";
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import ReactTooltip from 'react-tooltip'

class WebAnnotationsIconButton extends React.Component {
    render() {
        return (
            <div>
                <IconButton>
                    <MaterialIcon icon='class' />
                </IconButton>
            </div>
        );
    }
}

export default WebAnnotationsIconButton;