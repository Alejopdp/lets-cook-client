import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    image: {
        marginBottom: theme.spacing(4),
    },
    center: {
        display: "flex",
        placeItems: "center",
        minHeight: "100vh",
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: theme.spacing(10)
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
