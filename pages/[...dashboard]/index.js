// Utils & config
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { pagesPropsGetter } from "../../helpers/pagesPropsGetter/pagesPropsGetter";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { verifyToken } from "../../helpers/serverRequests/user";
import UpdatePlan from "../../components/organisms/updatePlan/updatePlan";

// External components
import { Box, makeStyles, Typography } from "@material-ui/core";

// Internal components
import LayoutFixedSidebar from "../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import RecipesDashboard from "../../components/organisms/recipesDashboard/";
import UsersDashboard from "../../components/organisms/usersDashboard/usersDashboard";
import PlansDashboard from "../../components/organisms/plansDashboard/plansDashboard";
import CreatePlan from "../../components/organisms/createPlan/createPlan";
import CreateUserDashboard from "../../components/organisms/createUserDashboard/createUserDashboard";
import UpdateUserDashboard from "../../components/organisms/updateUserDashboard";
import { clearLocalStorage, getToken } from "../../helpers/localStorage/localStorage";
import CreateRecipe from "../../components/organisms/createRecipe/createRecipe";
import UpdateRecipe from "../../components/organisms/updateRecipe/updateRecipe";
import ErrorPage from "../../components/molecules/errorPage/errorPage";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(8),
        paddingLeft: theme.spacing(8),
    },
    backBtn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "",
        paddingLeft: theme.spacing(35),
        paddingTop: theme.spacing(10),
        "@media (max-width: 780px)": {
            border: "1px solid red",
            paddingLeft: theme.spacing(0),
        },
    },
}));

const Index = (props) => {
    const route = useRouter();
    const classes = useStyles();

    useEffect(() => {
        const verifyTheToken = async () => {
            const token = getToken();

            if (!token) return route.replace("/", "/");

            const res = await verifyToken(token);

            if (res.status === 200) {
                return;
            } else {
                clearLocalStorage();
                route.replace("/", "/");
            }
        };

        verifyTheToken();
    }, [route.asPath]);

    const getSectionComponent = (path) => {
        /* TODO: IMPORTANT!!! 
            optimize the cases for return componet dynamically
        **/

        if (!!props.error) {
            return (
                <Box width="100%" height="100vh" className={classes.root}>
                    <Typography variant="h4">No yet / show here 404 page</Typography>
                </Box>
            );
        }

        switch (path) {
            case "recetas":
                return <RecipesDashboard filterList={props.filterList} recipesList={props.recipesList} hasError={props.hasError} />;

            case "recetas/crear":
                return <CreateRecipe formData={props.formData} recipeData={props.recipeData} />;

            case "recetas/modificar":
                return <UpdateRecipe formData={props.formData} recipeData={props.recipeData} hasError={props.hasError} />;

            case "gestion-de-usuarios":
                return <UsersDashboard users={props.users} />;

            case "gestion-de-usuarios/crear":
                return <CreateUserDashboard roles={props.roles} />;

            case "gestion-de-usuarios/modificar":
                return <UpdateUserDashboard roles={props.roles} user={props.user} />;

            case "planes":
                return <PlansDashboard plans={props.plans} />;

            case "planes/crear":
                return <CreatePlan additionalPlans={props.additionalPlans} />;

            case "planes/modificar":
                return <UpdatePlan additionalPlans={props.additionalPlans} plan={props.plan} />;

            default:
                return (
                    <Box width="100%" height="100vh" className={classes.root}>
                        <Typography variant="h1">No yet / show here 404 page</Typography>
                    </Box>
                );
        }
    };
    return (
        <SnackbarProvider maxSnack={3}>
            <LayoutFixedSidebar lang={props.langs}>
                {props.hasError ? <ErrorPage errorMessage={props.hasError} /> : getSectionComponent(route.query.dashboard.join("/"))}
            </LayoutFixedSidebar>
        </SnackbarProvider>
    );
};

Index.propTypes = {};

export async function getServerSideProps(context) {
    const langs = require("../../lang");
    console.log(context.req.headers);
    const props = await pagesPropsGetter(context.query, context.locale);

    return {
        props: { ...props, langs: { ...langs } },
    };
}

export default Index;
