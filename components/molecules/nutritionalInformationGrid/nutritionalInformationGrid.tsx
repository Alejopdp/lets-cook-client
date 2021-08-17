// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { DataGrid } from "@material-ui/data-grid";
import Box from "@material-ui/core/Box";
import Button from "../../atoms/button/button";

// Icon & images
import Add from "@material-ui/icons/Add";
import DynamicAttributesForm from "../dynamicAttributesForm/dynamicAttributesForm";

const NutritionalInformationGrid = (props) => {
    return (
        <>
            <DynamicAttributesForm
                attributes={props.rows}
                handleChange={props.handleRowEdit}
                handleDeleteAttr={props.handleDeleteAttribute}
            />

            <Box marginTop={2}>
                <Button variant="text" onClick={props.handleAddItem} startIcon={<Add />}>
                    AGREGAR INFORMACIÓN
                </Button>
            </Box>
        </>
    );
};

NutritionalInformationGrid.propTypes = {
    handleRowEdit: PropTypes.func.isRequired,
    handleAddItem: PropTypes.func.isRequired,
    rows: PropTypes.any.isRequired,
};

export default NutritionalInformationGrid;
