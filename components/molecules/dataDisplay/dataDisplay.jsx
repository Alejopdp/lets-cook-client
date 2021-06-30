// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";


// External Components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


// Internal components


const DataDisplay = props => {
    const theme = useTheme();

    return (
        <Box style={props.style}>
            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '14px', marginBottom: theme.spacing(1) }}>
                {props.title}
            </Typography>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px' }}>
                {props.text}
            </Typography>
        </Box>
    );
};

DataDisplay.propTypes = {
    // title: PropTypes.string.isRequired,
};

export default DataDisplay;
