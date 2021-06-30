// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";


// External Components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

// Internal components


const DataDisplayEditable = props => {
    const theme = useTheme();

    return (
        <Box style={props.style}>
            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '14px'}}>
                {props.title}
            </Typography>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                    {props.text}
                </Typography>
                <IconButton aria-label="edit" onClick={props.handleClick}>
                    <EditIcon fontSize='small' />
                </IconButton>
            </Box>
        </Box>
    );
};

DataDisplayEditable.propTypes = {
    // title: PropTypes.string.isRequired,
};

export default DataDisplayEditable;
