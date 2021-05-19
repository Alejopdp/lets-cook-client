import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add as AddIcon, List as ListIcon } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

import EmptyImage from "../../molecules/emptyImage/emptyImage";
import CardItemList from "../../molecules/cardItemList/cardItemList";
import ListCheckboxModal from "../../molecules/listCheckboxModal/listCheckboxModal";
import SimpleModal from "../../molecules/simpleModal/simpleModal";
import RefreshButton from "../../atoms/refresh-button/refreshButton";
import RecipesGrid from "./recipesGrid";
import RecipeFiltersAndSort from "./recipeFiltersAndSort";

import { useSortBy } from "../../../helpers/sortBy/sortBy";
import { deleteRecipe } from "../../../helpers/serverRequests/recipe";

const useStyles = makeStyles((theme) => ({
    height100: {
        minHeight: "100%",
    },
    paddingBottom2: {
        paddingBottom: theme.spacing(2),
    },
}));

export const RecipesDashboard = ({ recipesList: responseRecipesList = [], filterList = [], hasError: hasRequestError, token }) => {
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
                id: `weeks:${id}:${label}`,
                label,
            })),
        },
        {
            columnLabel: "Planes relacionados",
            items: filterList.plans.map(({ id, description }) => ({
                id: `plans:${id}:${description}`,
                label: description,
            })),
        },
        {
            columnLabel: "Tags",
            items: filterList.tags.map((tag, index) => ({
                id: `tags:${index}:${tag}`,
                label: tag,
            })),
        },
    ];

    const defaultRecipeState = { item: null, index: -1 };
    let handleDebounce;

    const classes = useStyles();
    const router = useRouter();
    const useSort = useSortBy();

    const [recipesList, setRecipesList] = useState([]);
    const [filters, setFilters] = useState([]);
    const [textToFilter, setTextToFilter] = useState("");
    const [sortBy, setSortBy] = useState(_sortOptions[0]);
    const [recipeSelected, selectRecipe] = useState(defaultRecipeState);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openSchedulerDialog, setOpenSchedulerDialog] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const _handleCreateReceipe = () => {
        router.push("recetas/crear");
    };
    const _handleSortListBy = (by, array) => {
        setSortBy(by);
        _applyFiltersAndSort({
            textToFilter,
            sortBy: by,
            filters,
        });
    };
    const _handleSearchText = (text = "") => {
        clearTimeout(handleDebounce);
        handleDebounce = setTimeout(() => {
            setTextToFilter(text);
            _applyFiltersAndSort({
                textToFilter: text,
                sortBy,
                filters,
            });
        }, 300);
    };
    const _handleApplyFilters = (_filters = []) => {
        setFilters(_filters);
        _applyFiltersAndSort({
            textToFilter,
            sortBy,
            filters: _filters,
        });
    };
    const _handleRemoveFilter = ({ id }) => {
        const index = filters.findIndex(({ id: _id }) => id === _id);
        if (index < 0) {
            return;
        }
        const newOptions = [...filters];
        newOptions.splice(index, 1);
        _handleApplyFilters(newOptions);
    };

    const _applyFiltersAndSort = ({ textToFilter: _textToFilter, filters: _filters = [], sortBy: _sortBy }) => {
        let sort;
        let field;

        // Filters
        const recipesFiltered = responseRecipesList.filter((recipe) => {
            let hasText = false;
            let hasTags = false;

            // Filter by name or SKU
            if (recipe.name.includes(_textToFilter) || recipe.sku.includes(_textToFilter)) {
                hasText = true;
            }
            if (_filters.length === 0) {
                return hasText;
            }
            // Filter by tags
            hasTags = _filters.some((filter) => {
                const [tagType, tagId, tagLabel] = filter.id.split(":");

                switch (tagType) {
                    case "weeks":
                        return recipe.availableWeeks.some(({ id }) => tagId === `${id}`);
                        break;
                    case "plans":
                        // TODO: Missing key in Recipe response.
                        throw "Filter Case not implimented yet";
                        break;
                    case "tags":
                        return recipe.backOfficeTags.some((label) => label === tagLabel);
                        break;
                    default:
                        return false;
                }
            });
            return hasText && hasTags;
        });

        // Sort by Name or Create Date

        switch (_sortBy.code) {
            case "sortByNameASC":
                sort = "ASC";
                field = "name";
                break;
            case "sortByNameDESC":
                sort = "DESC";
                field = "name";
                break;
            case "sortByDateASC":
                sort = "ASC";
                // TODO: Add create_dt to model
                // field = "?";
                throw "TODO: Sort not implemented yet";
                break;
            case "sortByDateASC":
                sort = "DESC";
                // TODO: Add create_dt to model
                // field = "?";
                throw "TODO: Sort not implemented yet";
                break;
        }

        const sorted = useSort({
            array: recipesFiltered,
            objKey: field,
            sortBy: sort,
        });

        // Set Recipes Sorted and filtered

        setRecipesList(sorted);
    };

    const _handlerEditRecipe = (index, item) => {
        router.push("/recetas/modificar/[id]", `recetas/modificar/${item.id}`);
    };

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

    const _handlerConfirmDelete = async () => {
        try {
            setOpenDeleteDialog(false);

            // // Real delete.
            const res = await deleteRecipe(token, recipeSelected.item.id);

            if (res.status >= 400) throw res.statusText;

            // // Virtual delete.
            const newStateToRecipeList = recipesList.reduce((recipes, recipe) => {
                if (`${recipe.id}` === `${recipeSelected.item.id}`) return recipes;
                return [...recipes, recipe];
            }, []);
            setRecipesList(newStateToRecipeList);

            selectRecipe(defaultRecipeState);

            enqueueSnackbar("Se ha eliminado la receta correctamente", {
                variant: "success",
            });
        } catch (error) {
            console.log("***-> Error: ", error);
            enqueueSnackbar("No se pudo eliminar la receta.", { variant: "error" });
        }
    };

    const _handlerRetryLoadRecipeRequest = () => router.reload();

    useEffect(() => {
        if (hasRequestError) {
            enqueueSnackbar("Error de servidor. Intenta nuevamente", {
                variant: "error",
                persist: true,
                action: () => <RefreshButton handleOnclick={_handlerRetryLoadRecipeRequest} />,
            });
        }
        setRecipesList(responseRecipesList);
    }, [hasRequestError, responseRecipesList]);

    return (
        <>
            {/* RECIPES TITLE */}

            <Grid item container>
                <Grid item xs>
                    <Typography variant="h5">Recetas</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" size="small" startIcon={<AddIcon></AddIcon>} onClick={_handleCreateReceipe}>
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
            <RecipeFiltersAndSort
                showFilters={recipesList.length > 0}
                filterOptions={_filterOptions}
                handlerOnConfirm={_handleApplyFilters}
                handlerOnSearchChange={_handleSearchText}
                handlerOnSortSelect={_handleSortListBy}
                sortOptions={_sortOptions}
                selected={sortBy.code}
                label={sortBy.label}
                optionsSelected={filters}
            />

            {/* RECIPE CHIPS */}

            {filters.length > 0 && (
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
                    {filters.map((itemFilter, index) => (
                        <Grid item key={index}>
                            <Chip label={itemFilter.label} onDelete={() => _handleRemoveFilter(itemFilter)} color="primary" />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* RECIPE LIST */}
            <RecipesGrid recipesList={recipesList} />

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

RecipesDashboard.protoType = {
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

export default RecipesDashboard;
