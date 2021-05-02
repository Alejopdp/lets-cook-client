import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import SeacrhInputField from "../molecules/searchInputField/searchInputField";
import ButtonDropdownMenu from "../molecules/buttonDropdownMenu/ButtonDropdownMenu";
import FilterByDropdown from "../molecules/filterByDropdown/filterByDropdown";
import EmptyImage from "../molecules/emptyImage/emptyImage";
import CardItemList from "../molecules/cardItemList/cardItemList";
import ListCheckboxModal from "../molecules/listCheckboxModal/listCheckboxModal";
import SimpleModal from "../molecules/simpleModal/simpleModal";
import RefreshButton from "../atoms/refresh-button/refreshButton";

const useStyles = makeStyles((theme) => ({
    height100: {
        minHeight: "100%",
    },
    paddingBottom2: {
        paddingBottom: theme.spacing(2),
    },
}));

export const RecipesList = ({ recipesList = [], filterList = [], hasError: hasRequestError }) => {
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
            items: filterList.weeks.map(({ id, label }) => ({
                id: `${id}:${label}`,
                label,
            })),
        },
        {
            columnLabel: "Planes relacionados",
            items: filterList.plans.map(({ id, description }) => ({
                id: `${id}:${description}`,
                label: description,
            })),
        },
        {
            columnLabel: "Tags",
            items: filterList.tags.map((tag) => ({
                id: `${tag}:${tag}`,
                label: tag,
            })),
        },
    ];

    const defaultRecipeState = { item: null, index: -1 };

    const classes = useStyles();
    const router = useRouter();
    const [filtersBy, setFilters] = useState([]);
    const [recipeSelected, selectRecipe] = useState(defaultRecipeState);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openSchedulerDialog, setOpenSchedulerDialog] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const _handlerCreateReceipe = () => {
        router.push("recetas/crear");
    };

    const _handlerSearchText = (text) => {};
    const _handlerSortListBy = (by) => {};
    const _handlerApplyFilterBy = (filters = []) => setFilters(filters);
    const _handlerRemoveFilter = ({ id }) => {
        const index = filtersBy.findIndex(({ id: _id }) => id === _id);
        if (index < 0) {
            return;
        }
        const newOptions = [...filtersBy];
        newOptions.splice(index, 1);
        setFilters(newOptions);
        // TODO: put here code for remove filters
    };

    const _handlerEditRecipe = (index, item) => {
        router.push("/recetas/modificar/[id]", `recetas/modificar/${item.id}`);
    };

    const _handlerDeleteReceipe = (index, item) => {
        selectRecipe({ item, index });
        setOpenDeleteDialog(true);

        // TODO: put here code for delete recipe

        enqueueSnackbar('Se ha eliminado la receta correctamente', {
            variant: 'success',
        });
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

    const _handlerRetryLoadRecipeRequest = () => router.reload();

    useEffect(() => {
        if (hasRequestError) {
            enqueueSnackbar("Error de servidor. Intenta nuevamente", {
                variant: "error",
                persist: true,
                action: () => <RefreshButton handleOnclick={_handlerRetryLoadRecipeRequest}/>,
            });
        }
    }, [hasRequestError]);

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

                {/* RECIPE FILTERS AND SORT */}

                {recipesList.length > 0 && (
                    <Grid item container spacing={3} justify="center">
                        <Grid item>
                            <FilterByDropdown
                                handlerOnConfirm={_handlerApplyFilterBy}
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

                {/* RECIPE CHIPS */}

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
                        {recipesList.map((recipe, index) => (
                            <Grid item xs="auto" sm={6} md={3} key={index}>
                                <CardItemList
                                    item={recipe}
                                    handlerDelete={() => _handlerDeleteReceipe(index, recipe)}
                                    handlerEdit={() => _handlerEditRecipe(index, recipe)}
                                    handlerScheduler={() => _handlerSchedulerReceipe(index, recipe)}
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

RecipesList.protoType = {
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
            availableWeeks: PropTypes.arrayOf(
                PropTypes.exact({
                    id: PropTypes.number,
                    label: PropTypes.string,
                })
            ),
            availableMonths: PropTypes.arrayOf(PropTypes.string),
        })
    ),
    filterList: PropTypes.exact({
        plans: PropTypes.exact({
            id: PropTypes.number,
            description: PropTypes.string,
        }),
        weeks: PropTypes.exact({
            id: PropTypes.number,
            label: PropTypes.string,
        }),
        tags: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default RecipesList;
