// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import CardItemList from "../../molecules/cardItemList/cardItemList";

const RecipesGrid = (props) => {
    return (
        <Grid item container spacing={2}>
            {props.recipesList.map((recipe, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <CardItemList
                        item={recipe}
                        handlerDelete={() => props.handleOpenDeleteModal(index, recipe)}
                        handlerEdit={() => props.handleEditRecipe(index, recipe)}
                        handlerScheduler={() => props.handleOpenCalendarModal(index, recipe)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

RecipesGrid.propTypes = {
    recipesList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            sku: PropTypes.string,
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
    handleOpenCalendarModal: PropTypes.func.isRequired,
    handleOpenDeleteModal: PropTypes.func.isRequired,
    handleEditRecipe: PropTypes.func.isRequired,
};

export default RecipesGrid;
