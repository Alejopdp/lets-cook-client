import React, { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Add as AddIcon, PhotoCamera } from "@material-ui/icons";
import SeacrhInputField from "../atoms/searchInputField/searchInputField";
import ButtonDropdownMenu from "../atoms/buttonDropdownMenu/ButtonDropdownMenu";
import FilterByDropdown from "../molecules/filterByDropdown/filterByDropdown";
import EmptyImage from "../atoms/emptyImage/emptyImage";
import CardItemList from "../molecules/cardItemList/cardItemList";

const useStyles = makeStyles((theme) => ({
    height100: {
        minHeight: "100%",
    },
    paddingBottom2:{
        paddingBottom: theme.spacing(2)
    }
}));

export const RecipesList = () => {
    const _recipesItems = [
        {
            sku: "REF021",
            name: "Burger de Halloumi",
            description: "Burger de Halloumi con patatas al romero y pesto cremoso",
            schedule: ["10-17 Abril", "18-25 Abril", "26-03 Mayo"],
        },
        {
            sku: "REF021",
            name: "Burger de Halloumi",
            description: "Burger de Halloumi con patatas al romero y pesto cremoso",
            schedule: ["10-17 Abril", "18-25 Abril", "26-03 Mayo"],
        },
        {
            sku: "REF021",
            name: "Burger de Halloumi",
            description: "Burger de Halloumi con patatas al romero y pesto cremoso",
            schedule: ["10-17 Abril", "18-25 Abril", "26-03 Mayo"],
        },
        {
            sku: "REF021",
            name: "Burger de Halloumi",
            description: "Burger de Halloumi con patatas al romero y pesto cremoso",
            schedule: ["10-17 Abril", "18-25 Abril", "26-03 Mayo"],
        },
        {
            sku: "REF021",
            name: "Burger de Halloumi",
            description: "Burger de Halloumi con patatas al romero y pesto cremoso",
            schedule: ["10-17 Abril", "18-25 Abril", "26-03 Mayo"],
        },
        {
            sku: "REF021",
            name: "Burger de Halloumi",
            description: "Burger de Halloumi con patatas al romero y pesto cremoso",
            schedule: ["10-17 Abril", "18-25 Abril", "26-03 Mayo"],
        },
        {
            sku: "REF021",
            name: "Burger de Halloumi",
            description: "Burger de Halloumi con patatas al romero y pesto cremoso",
            schedule: ["10-17 Abril", "18-25 Abril", "26-03 Mayo"],
        },
        {
            sku: "REF021",
            name: "Burger de Halloumi",
            description: "Burger de Halloumi con patatas al romero y pesto cremoso",
            schedule: ["10-17 Abril", "18-25 Abril", "26-03 Mayo"],
        },
        {
            sku: "REF021",
            name: "Burger de Halloumi",
            description: "Burger de Halloumi con patatas al romero y pesto cremoso",
            schedule: ["10-17 Abril", "18-25 Abril", "26-03 Mayo"],
        },
        {
            sku: "REF021",
            name: "Burger de Halloumi",
            description: "Burger de Halloumi con patatas al romero y pesto cremoso",
            schedule: ["10-17 Abril", "18-25 Abril", "26-03 Mayo"],
        },
    ];

    const _sortOptions = [
        {
            label: "Ordenar por nombre: A-Z",
            code: "sortByNameASC",
        },
        {
            label: "Ordenar por nombre: Z-A",
            code: "sortByNameDESC",
        },
        {
            label: "Fecha de publicación: ASC",
            code: "sortByDateASC",
        },
        {
            label: "Fecha de publicación: DESC",
            code: "sortByDateASC",
        },
    ];

    const _filterOptions = [
        {
            columnLabel: "Calendario",
            items: [
                {
                    label: "Sin programar",
                    code: "calendar:none",
                },
                {
                    label: "10-17 Abril",
                    code: "calendar:april:10:17",
                },
                {
                    label: "18-25 Abril",
                    code: "calendar:april:18:25",
                },
            ],
        },
        {
            columnLabel: "Planes relacionados",
            items: [
                {
                    label: "Plan ahorro",
                    code: "plan:savings",
                },
                {
                    label: "Plan familiar",
                    code: "plan:familiar",
                },
                {
                    label: "Plan vegetariano",
                    code: "plan:vegetarian",
                },
            ],
        },
        {
            columnLabel: "Tags",
            items: [
                {
                    label: "Vegano",
                    code: "tag:vegan",
                },
                {
                    label: "Vegetariano",
                    code: "tag:vegetarian",
                },
                {
                    label: "Pollo",
                    code: "tag:chicken",
                },
            ],
        },
    ];

    const classes = useStyles();
    const [filtersBy, setFilters] = useState([]);

    const _handlerCreateReceipe = () => {};
    const _handlerSearchText = (text) => {};
    const _handlerSortListBy = (by) => {};
    const _handlerAppllyFilterBy = (filters = []) => setFilters(filters);
    const _handlerRemoveFilter = ({ code }) => {
        const index = filtersBy.findIndex(({ code: _code }) => code === _code);
        if (index < 0) {
            return;
        }
        const newOptions = [...filtersBy];
        newOptions.splice(index, 1);
        setFilters(newOptions);
    };

    const _handlerEditReceipe = (index, item) => {};
    const _handlerDeleteReceipe = (index, item) => {};
    const _handlerSchedulerReceipe = (index, item) => {};

    return (
        <Grid container direction="column" spacing={5} className={classes.height100}>
            <Grid item container>
                <Grid item xs>
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

            {_recipesItems.length === 0 && (
                <Grid item xs container justify="center" alignItems="center">
                    <EmptyImage label={"Aun no se encuentran recetas"} />
                </Grid>
            )}

            {_recipesItems.length > 0 && (
                <Grid item container spacing={3} justify="center">
                    <Grid item>
                        <FilterByDropdown handlerOnConfirm={_handlerAppllyFilterBy} optionsSelected={filtersBy} options={_filterOptions} />
                    </Grid>
                    <Grid item xs>
                        <SeacrhInputField handlerOnChange={_handlerSearchText} />
                    </Grid>
                    <Grid item>
                        <ButtonDropdownMenu options={_sortOptions} label={_sortOptions[0].label} handlerOnSelect={_handlerSortListBy} />
                    </Grid>
                </Grid>
            )}

            {filtersBy.length > 0 && (
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    alignContent="stretch"
                    wrap="wrap"
                    className={classes.paddingBottom2}
                >
                    {filtersBy.map((itemFilter) => (
                        <Grid item>
                            <Chip label={itemFilter.label} onDelete={() => _handlerRemoveFilter(itemFilter)} color="primary" />
                        </Grid>
                    ))}
                </Grid>
            )}

            {_recipesItems.length > 0 && (
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="flex-start"
                    alignContent="flex-start"
                    alignItems="flex-start"
                    wrap="wrap"
                >
                    {_recipesItems.map((receipe, index) => (
                        <Grid item xs="auto" sm={6} md={3}>
                            <CardItemList
                                item={receipe}
                                handlerDelete={(item) => _handlerDeleteReceipe(index, item)}
                                handlerEdit={(item) => _handlerEditReceipe(index, item)}
                                handlerScheduler={(item) => _handlerSchedulerReceipe(index, item)}
                            ></CardItemList>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
};

export default RecipesList;
