import { Button, Grid, IconButton, Typography, Box } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import React, { useState } from "react";

const SimpleTileList = (props) => {
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
                                    <Box display="flex" alignItems="flex-end">
                                        <Typography variant="body1" color="initial" style={{ marginRight: 12, fontWeight: "Bold" }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body1" color="initial" style={{ fontSize: 14 }}>
                                            {item.type}
                                        </Typography>
                                    </Box>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item>
                    <Button color="default" variant="contained" startIcon={<Add />} onClick={props.handleButtonClick}>
                        Agregar producto
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
export default SimpleTileList;
