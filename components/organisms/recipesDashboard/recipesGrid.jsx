// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import CardItemList from "../../molecules/cardItemList/cardItemList";

const RecipesGrid = (props) => {
    return (
        props.recipesList.length > 0 && (
            <Grid container spacing={1} direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start" wrap="wrap">
                {props.recipesList.map((recipe, index) => (
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
        )
    );
};

RecipesGrid.propTypes = {
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
};

export default RecipesGrid;
