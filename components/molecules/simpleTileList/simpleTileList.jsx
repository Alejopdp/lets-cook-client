import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import React, { useState } from "react";
import CheckboxList from "../../atoms/checkboxList/checkboxList";
import ComplexModal from "../complexModal/complexModal";

// interface SimpleListItem {
//     label: string,
//     value: any
// }

// interface Props {
//     list: SimpleListItem[],
//     listItemsSelected: SimpleListItem[],
//     handleChangeList?: (list: SimpleListItem[]) => void,
//     handleRemoveItem?: (item: SimpleListItem) => void,
//     hideRemoveButton?: boolean,
//     useBold?: boolean
// }

const SimpleTileList = (props) => {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Grid container direction="column">
                        {props.listItemsSelected.map((item, index) => (
                            <Grid key={index} item>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {!props.hideRemoveButton && (
                                        <IconButton onClick={() => props.handleRemoveItem(item)}>
                                            <Delete />
                                        </IconButton>
                                    )}
                                    <Typography>
                                        {props.useBold && (
                                            <>
                                                <b>{item.label}</b> {item.value}
                                            </>
                                        )}
                                        {!props.useBold && item.label + " " + item.value}
                                    </Typography>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item>
                    <Button color="default" variant="contained" startIcon={<Add />} onClick={() => {
                        props.handleChangeList({label: "test-"+props.listItemsSelected.length, value: "test"})
                    //    setOpenDialog(true)
                    }
                        }>
                        Agregar producto
                    </Button>
                </Grid>
            </Grid>

            {/* <ComplexModal
                title="Agregar productos"
                component={
                    <CheckboxList
                        handleOnChange={handleOnChange}
                        items={products.map((product, index) => ({
                            label: (
                                <Typography>
                                    <b>{product.name}</b> {product.type}
                                </Typography>
                            ),
                            name: product.name,
                        }))}
                    />
                }
                cancelButtonText="volver"
                confirmButtonText="Agregar Productos"
                handleConfirmButton={() => setOpenDialog(false)}
                handleCancelButton={() => setOpenDialog(false)}
                open={openDialog}
                handleClose={() => { }}
            /> */}
        </>
    );
};
export default SimpleTileList;
