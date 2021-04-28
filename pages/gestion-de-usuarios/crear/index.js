// Utils & config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CreateUser from "../../../components/createUser";

// External components
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

// Internal components
import LayoutFixedSidebar from "../../../components/layout/layoutFixedSidebar/layoutFixedSidebar";

// Icons & Images
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
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

const Crear = () => {
    const classes = useStyles();

    return (
        <>
            <Link href="/gestion-de-usuarios">
                <div className={classes.backBtn}>
                    <ArrowBackIcon />

                    <Typography variant="h5">Crear usuario</Typography>
                </div>
            </Link>

            <LayoutFixedSidebar>
                <CreateUser />
            </LayoutFixedSidebar>
        </>
    );
};

export default Crear;
