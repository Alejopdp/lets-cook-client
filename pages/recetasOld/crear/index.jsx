import { useRouter } from "next/router";
import { Box, Container, makeStyles } from "@material-ui/core";

import LayoutFixedSidebar from "../../../components/layout/layoutFixedSidebar/layoutFixedSidebar";

import { getRecipeFormData } from "../../../helpers/serverRequests/recipe";

import RecipeCreateForm from "../../../components/recipeForm/recipeForm";
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(8),
        paddingLeft: theme.spacing(8),
    },
}));

const RecipeForm = ({ formData }) => {
    const classes = useStyles();
    const router = useRouter();

    return (
        <LayoutFixedSidebar>
            {/* <Box width="100%" height="100vh" className={classes.root}> */}
            <Container maxWidth="md" style={{ margin: "auto" }}>
                <RecipeCreateForm recipesData={null} formData={formData}></RecipeCreateForm>
            </Container>
            {/* </Box> */}
        </LayoutFixedSidebar>
    );
};

export async function getServerSideProps(context) {
    // TODO: IMPORTANT!!! Remove "test"
    const token = context.query.token || "test";

    if (token) {
        let hasError = false;
        const res = await Promise.all([
            getRecipeFormData(token),
        ]);

        if (res.status >= 500) {
            hasError = true;
        }

        return {
            props: {
                isTokenValid: !!res[0] && res.status === 200,
                formData: res[0].data,
                token: res ? token : null,
                hasError,
            },
        };
    } else {
        return {
            props: {
                isTokenValid: false,
                recipesData: null,
                token: null,
            },
        };
    }
}
export default RecipeForm;
