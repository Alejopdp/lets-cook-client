// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";


// External Components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


// Internal components
import OrdersDenseTable from "./ordersDenseTable";


const DataDisplayOrderTable = props => {
    const theme = useTheme();

    return (
        <Box style={props.style}>
            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '14px', marginBottom: theme.spacing(1) }}>
                {props.title}
            </Typography>
            <OrdersDenseTable rows={props.rows} columns={props.columns} />
        </Box>
    );
};

DataDisplayOrderTable.propTypes = {
    // title: PropTypes.string.isRequired,
};

export default DataDisplayOrderTable;
