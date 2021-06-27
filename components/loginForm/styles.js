import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    image: {
        padding: theme.spacing(2),
    },
    center: {
        display: "flex",
        placeItems: "center",
        minHeight: "75vh",
    },

    form: {
        display: "flex",
        flexDirection: "column",
    },
    btnDiv: {
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        marginTop: theme.spacing(3),
    },
    margin: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    textField: {
        width: "100%",
    },
}));
