import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import SeacrhInputField from "../molecules/searchInputField/searchInputField";
import ButtonDropdownMenu from "../molecules/buttonDropdownMenu/ButtonDropdownMenu";
import FilterByDropdown from "../molecules/filterByDropdown/filterByDropdown";
import EmptyImage from "../molecules/emptyImage/emptyImage";
import CardItemList from "../molecules/cardItemList/cardItemList";
import SimpleModal from "../molecules/simpleModal/simpleModal";
import ListCheckboxModal from "../molecules/listCheckboxModal/listCheckboxModal";
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    height100: {
        minHeight: "100%",
    },
    paddingBottom2: {
        paddingBottom: theme.spacing(2),
    },
}));

export const RecipesList = ({recipesList = [] }) => {
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

    const defaultRecipeState = { item: null, index: -1 };

    const classes = useStyles();
    const [filtersBy, setFilters] = useState([]);
    const [recipeSelected, selectRecipe] = useState(defaultRecipeState);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openSchedulerDialog, setOpenSchedulerDialog] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const _handlerCreateReceipe = () => { 
        enqueueSnackbar('Se ha eliminado la receta correctamente', { 
            variant: 'success',
        });
    };
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

    const _handlerDeleteReceipe = (index, item) => {
        selectRecipe({ item, index });
        setOpenDeleteDialog(true);
    };

    const _handlerSchedulerReceipe = (index, item) => {
        selectRecipe({ item, index });
        setOpenSchedulerDialog(true);
    };

    const _handlerCloseDialogs = () => {
        selectRecipe(defaultRecipeState);
        setOpenDeleteDialog(false);
        setOpenSchedulerDialog(false);
    };

    const _handlerConfirmSchedulerChange = (schedules) => {
        setOpenSchedulerDialog(false);
        // TODO: put here code for edit schedules recipe
        // console.log("***-> Schedulers: ", schedules);
        selectRecipe(defaultRecipeState);
    };

    const _handlerConfirmDelete = () => {
        setOpenDeleteDialog(false);
        // TODO: put here code for delete recipe
        // console.log(recipeSelected);
        selectRecipe(defaultRecipeState);
    };

    return (
        <>
            <Grid container direction="column" spacing={5} className={classes.height100}>

                {/* RECIPES TITLE */}

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

                {/* RECIPES EMPTY IMAGE */}

                {recipesList.length === 0 && (
                    <Grid item xs container justify="center" alignItems="center">
                        <EmptyImage label={"Aun no se encuentran recetas"} />
                    </Grid>
                )}

                {/* RECIPE FILTER BUTTON */}

                {recipesList.length > 0 && (
                    <Grid item container spacing={3} justify="center">
                        <Grid item>
                            <FilterByDropdown
                                handlerOnConfirm={_handlerAppllyFilterBy}
                                optionsSelected={filtersBy}
                                options={_filterOptions}
                            />
                        </Grid>
                        <Grid item xs>
                            <SeacrhInputField handlerOnChange={_handlerSearchText} />
                        </Grid>
                        <Grid item>
                            <ButtonDropdownMenu options={_sortOptions} label={_sortOptions[0].label} handlerOnSelect={_handlerSortListBy} />
                        </Grid>
                    </Grid>
                )}

                {/* RECIPE SEARCH INPUT */}

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
                        {filtersBy.map((itemFilter, index) => (
                            <Grid item key={index}>
                                <Chip label={itemFilter.label} onDelete={() => _handlerRemoveFilter(itemFilter)} color="primary" />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* RECIPE LIST */}

                {recipesList.length > 0 && (
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="flex-start"
                        alignContent="flex-start"
                        alignItems="flex-start"
                        wrap="wrap"
                    >
                        {recipesList.map((receipe, index) => (
                            <Grid item xs="auto" sm={6} md={3} key={index}>
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

            {/* RECIPES MODALS */}

            <SimpleModal
                title="Eliminar receta"
                paragraphs={["¿Estás seguro de que quieres eliminar la receta Burger de Halloumi?"]}
                confirmButtonText="ELIMINAR RECETA"
                cancelButtonText="VOLVER"
                handleConfirmButton={_handlerConfirmDelete}
                handleCancelButton={_handlerCloseDialogs}
                open={openDeleteDialog}
                handleClose={() => {}}
            />

            <ListCheckboxModal
                title="Asignar fecha"
                confirmButtonText="APLICAR FILTROS"
                cancelButtonText="VOLVER"
                items={_filterOptions[0].items}
                handleConfirmButton={_handlerConfirmSchedulerChange}
                handleCancelButton={_handlerCloseDialogs}
                open={openSchedulerDialog}
                handleClose={() => {}}
                // TODO: Get data from item selected
                optionsSelected={[
                    {
                        label: "Sin programar",
                        code: "calendar:none",
                    },
                    {
                        label: "10-17 Abril",
                        code: "calendar:april:10:17",
                    },
                ]}
            />
        </>
    );
};

RecipesList.prototype = {
    recipesList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            sku: PropTypes.string,
            shortDescription: PropTypes.string,
            longDescription: PropTypes.string,
            cookDuration: PropTypes.string,
            difficultyLevel: PropTypes.string,
            imageUrl: PropTypes.string,
            weight: PropTypes.string,
            backOfficeTags: PropTypes.arrayOf(PropTypes.string),
            imageTags: PropTypes.arrayOf(PropTypes.string),
        })
    ),
};

export default RecipesList;
