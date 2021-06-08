// Utils & config
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSortBy } from "../../../helpers/sortBy/sortBy";
import { deleteRecipe, updateRecipeWeeks } from "../../../helpers/serverRequests/recipe";

// External components
import { Button, Chip, Grid, makeStyles, Typography, Box } from "@material-ui/core";
import { Add as AddIcon, List as ListIcon } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

// Internal components
import EmptyImage from "../../molecules/emptyImage/emptyImage";
import ListCheckboxModal from "../../molecules/listCheckboxModal/listCheckboxModal";
import SimpleModal from "../../molecules/simpleModal/simpleModal";
import RefreshButton from "../../atoms/refresh-button/refreshButton";
import RecipesGrid from "./recipesGrid";
import RecipeFiltersAndSort from "./recipeFiltersAndSort";
import CreateDashboardTitle from "../../molecules/createDsahboardTitle/createDashboardTitle";

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
        router.push("/recetas/crear");
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
        setTextToFilter(text);
        _applyFiltersAndSort({
            textToFilter: text,
            sortBy,
            filters,
        });
    };
    const _handleApplyFilters = (_filters = []) => {
        setFilters(_filters);
        _applyFiltersAndSort({
            textToFilter: textToFilter.toLowerCase(),
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
            if (recipe.name.toLowerCase().includes(_textToFilter) || recipe.sku.toLowerCase().includes(_textToFilter)) {
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
                        return recipe.relatedPlans.some((id) => tagId === `${id}`);
                        // throw "Filter Case not implimented yet";
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
        router.push({ pathname: "/recetas/modificar", query: { id: item.id } });
    };

    const _handlerDeleteReceipe = (index, recipe) => {
        selectRecipe({ recipe, index });
        setOpenDeleteDialog(true);
    };

    const _handlerSchedulerReceipe = (index, recipe) => {
        selectRecipe({ recipe, index });
        setOpenSchedulerDialog(true);
    };

    const _handlerCloseDialogs = () => {
        selectRecipe(defaultRecipeState);
        setOpenDeleteDialog(false);
        setOpenSchedulerDialog(false);
    };

    const _handlerConfirmSchedulerChange = async (newWeeks) => {
        const res = await updateRecipeWeeks(
            recipeSelected.recipe.id,
            newWeeks.map((week) => week.id)
        );

        if (res.status === 200) {
            setRecipesList(
                recipesList.map((recipe) => {
                    if (recipe.id === recipeSelected.recipe.id) {
                        return {
                            ...recipe,
                            availableWeeks: newWeeks,
                        };
                    }

                    return recipe;
                })
            );

            setOpenSchedulerDialog(false);
            selectRecipe(defaultRecipeState);
            enqueueSnackbar("La receta se ha actualizado correctamente", { variant: "success" });
        } else {
            enqueueSnackbar("Error al actualizar la receta", { variant: "error" });
        }
    };

    const _handlerConfirmDelete = async () => {
        try {
            setOpenDeleteDialog(false);

            // // Real delete.
            const res = await deleteRecipe(token, recipeSelected.recipe.id);

            if (res.status >= 400) throw res.statusText;

            // // Virtual delete.
            const newStateToRecipeList = recipesList.reduce((recipes, recipe) => {
                if (`${recipe.id}` === `${recipeSelected.recipe.id}`) return recipes;
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
            <CreateDashboardTitle createButtonText="CREAR RECETA" dashboardTitle="Recetas" handleCreateButton={_handleCreateReceipe} />

            {/* RECIPE FILTERS AND SORT */}
            <RecipeFiltersAndSort
                showFilters={responseRecipesList.length > 0}
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
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        {filters.map((itemFilter, index) => (
                            <Chip
                                key={index}
                                label={itemFilter.label}
                                onDelete={() => _handleRemoveFilter(itemFilter)}
                                color="primary"
                                style={{ marginRight: 8 }}
                            />
                        ))}
                    </Box>
                </Grid>
            )}

            {/* RECIPE LIST */}
            {recipesList.length > 0 ? (
                <RecipesGrid
                    recipesList={recipesList}
                    handleOpenCalendarModal={_handlerSchedulerReceipe}
                    handleOpenDeleteModal={_handlerDeleteReceipe}
                    handleEditRecipe={_handlerEditRecipe}
                />
            ) : (
                <EmptyImage label="No se han encontrado recetas que coincidan con los términos de búsqueda" />
            )}

            {/* RECIPES MODALS */}
            {openDeleteDialog && (
                <SimpleModal
                    title="Eliminar receta"
                    paragraphs={[`¿Estás seguro de que quieres eliminar la receta ${recipeSelected.recipe.name}?`]}
                    confirmButtonText="ELIMINAR RECETA"
                    cancelButtonText="VOLVER"
                    handleConfirmButton={_handlerConfirmDelete}
                    handleCancelButton={_handlerCloseDialogs}
                    open={openDeleteDialog}
                    handleClose={() => {}}
                />
            )}
            {openSchedulerDialog && (
                <ListCheckboxModal
                    title="Asignar fecha"
                    confirmButtonText="APLICAR FILTROS"
                    cancelButtonText="VOLVER"
                    items={filterList.weeks}
                    handleConfirmButton={_handlerConfirmSchedulerChange}
                    handleCancelButton={_handlerCloseDialogs}
                    open={openSchedulerDialog}
                    handleClose={() => {}}
                    optionsSelected={recipeSelected.recipe.availableWeeks}
                />
            )}
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
