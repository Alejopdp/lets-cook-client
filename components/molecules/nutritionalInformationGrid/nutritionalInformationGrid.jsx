// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { DataGrid } from "@material-ui/data-grid";
import Box from "@material-ui/core/Box";
import Button from "../../atoms/button/button";

// Icon & images
import Add from "@material-ui/icons/Add";

const NutritionalInformationGrid = (props) => {
    return (
        <>
            <DataGrid
                isCellEditable={true}
                onEditCellChangeCommitted={(params, e) => props.handleRowEdit(params, e)}
                autoHeight
                disableColumnMenu
                disableColumnSelector
                disableColumnFilter
                disableColumnReorder
                disableColumnResize
                headerHeight={0}
                showCellRightBorder
                hideFooter
                rows={props.rows}
                columnBuffer={0}
                density="compact"
                columns={[
                    { field: "key", headerName: "key", type: "string" },
                    { field: "value", headerName: "value", type: "string" },
                ]}
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
