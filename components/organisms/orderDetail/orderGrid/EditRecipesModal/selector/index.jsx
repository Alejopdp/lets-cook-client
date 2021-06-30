// Utils & Config
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const Selector = (props) => {
    const theme = useTheme();

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => props.handleChange(props.id, -1)} style={{ color: '#FC1919' }}>
                <RemoveCircleIcon />
            </IconButton>
            <Typography>{props.quantity}</Typography>
            <IconButton onClick={() => props.handleChange(props.id, +1)} color="primary">
                <AddCircleIcon />
            </IconButton>
        </div>
    )
}

export default Selector;