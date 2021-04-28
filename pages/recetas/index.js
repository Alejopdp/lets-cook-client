import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { RecipesList } from "../../components/recipesList";
import LayoutFixedSidebar from "../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import { loadRecipesList } from "../../helpers/serverRequests/recipe";
import { SnackbarProvider } from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(8),
        paddingLeft: theme.spacing(8),
    },
}));
const RecipesPage = ({ recipesList = [] }) => {
    const classes = useStyles();
    
    return (
        <LayoutFixedSidebar>
            <Box width="100%" height="100vh" className={classes.root}>
            {/* https://iamhosseindhv.com/notistack */}
            <SnackbarProvider preventDuplicate maxSnack={3}>
                <RecipesList recipesList={recipesList} />
            </SnackbarProvider>
            </Box>
        </LayoutFixedSidebar>
    );
};

export async function getServerSideProps(context) {
    const token = context.query.token || "test"; // TODO: REMOVE "test"
    if (token) {
        const res = await loadRecipesList(token);
        return {
            props: {
                isTokenValid: !!res && res.status === 200,
                recipesList: res.data,
                token: res ? token : null,
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
