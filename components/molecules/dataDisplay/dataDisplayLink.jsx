// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";


// External Components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";


// Internal components


const DataDisplayLink = props => {
    const theme = useTheme();

    return (
        <Box style={props.style}>
            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '14px', marginBottom: theme.spacing(1) }}>
                {props.title}
            </Typography>
            <Link href={props.link} target="_blank" rel="noreferrer" color='primary' style={{ textDecoration: 'none', cursor: 'pointer', fontWeight: 600 }}>
                <Typography variant='body2' style={{ fontSize: '16px' }}>
                    {props.text}
                </Typography>
            </Link>
        </Box>
    );
};

DataDisplayLink.propTypes = {
    // title: PropTypes.string.isRequired,
};

export default DataDisplayLink;
