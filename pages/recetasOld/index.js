import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { RecipesList } from "../../components/recipesList";
import LayoutFixedSidebar from "../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import { getRecipesFilterOptions, getRecipes } from "../../helpers/serverRequests/recipe";
import { SnackbarProvider } from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(8),
        paddingLeft: theme.spacing(8),
    },
}));
const RecipesPage = ({ recipesList = [], filterList = [], hasError }) => {
    const classes = useStyles();

    return (
        <LayoutFixedSidebar>
            <Box width="100%" height="100vh" className={classes.root}>
                {/* https://iamhosseindhv.com/notistack */}
                <SnackbarProvider preventDuplicate maxSnack={3}>
                    <RecipesList 
                        filterList={filterList} 
                        recipesList={recipesList}
                        hasError={hasError} />
                </SnackbarProvider>
            </Box>
        </LayoutFixedSidebar>
    );
};

export async function getServerSideProps(context) {
    // TODO: IMPORTANT!!! Remove "test"
    const token = context.query.token || "test";
    if (token) {
        let hasError = false;
        const res = await Promise.all([getRecipes(token), getRecipesFilterOptions(token)]);
        if(res.status >= 500) { hasError = true; }
        return {
            props: {
                isTokenValid: !!res[0] && !!res[1] && res.status === 200,
                recipesList: res[0].data,
                filterList: res[1].data,
                token: res ? token : null,
                hasError
            },
        };
    } else {
        return {
            props: {
                isTokenValid: false,
                recipesList: null,
                token: null,
            },
        };
    }
}

export default RecipesPage;
