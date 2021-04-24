import React from "react";
import {
    Box,
    Button,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import { Add as AddIcon} from "@material-ui/icons";
import SeacrhInputField from "../molecules/searchInputField/searchInputField";
import SortDropdownMenu from "../molecules/sortDropdownMenu/sortDropdownMenu";
import FilterByDropdown from "../molecules/filterByDropdown/filterByDropdown";

const useStyles = makeStyles((theme) => ({
    flex: {
        display: "flex",
    },
    marginTo4: {
        marginTop: theme.spacing(4),
    },
    
    textFieldGroup: {
        display: "flex",
        alignItems: "center",
    },
}));

export const RecipesList = () => {
    const classes = useStyles();

    const _handlerCreateReceipe = () => { }
    const _handlerSearchText = (text) => { }
    const _handlerSortListBy = (by) => { }

    return (
        <Box width="100%" my={10} mx={3}>
            <Grid container>
                <Grid item xs className={classes.flex}>
                    <Typography variant="h5">Recetas</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<AddIcon></AddIcon>}
                        onClick={_handlerCreateReceipe}
                    >
                        CREAR RECETA
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={3} justify="center" className={classes.marginTo4}>
                <Grid item>
                    <FilterByDropdown></FilterByDropdown>
                </Grid>
                <Grid item xs>
                   <SeacrhInputField 
                    handlerOnChange={ _handlerSearchText }
                    />
                </Grid>
                <Grid item>
                    <SortDropdownMenu 
                        label="ORDENAR POR NOMBRE A-Z" 
                        handlerOnSelect={_handlerSortListBy}
                        />
                </Grid>
            </Grid>
        </Box>
    );
};

export default RecipesList;
