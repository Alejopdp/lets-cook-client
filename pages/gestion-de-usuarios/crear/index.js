// Utils & config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getRoleList } from "../../../helpers/serverRequests/role";

// External components
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

// Internal components
import CreateUser from "../../../components/createUser";
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

const Crear = (props) => {
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
                <CreateUser buttonText="Crear usuario" roles={props.roles} creation={true} user={{}} />
            </LayoutFixedSidebar>
        </>
    );
};

export async function getServerSideProps(context) {
    const res = await getRoleList();

    return {
        props: {
            roles: res.data ? res.data : [],
        },
    };
}

export default Crear;
