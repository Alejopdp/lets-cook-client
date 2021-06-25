// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// External components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";

// Icons & Images
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        marginTop: theme.spacing(4)
    },
    table: {
        minWidth: 500,
    },
    cells: {
        padding: theme.spacing(0.5),
        paddingRight: theme.spacing(1)
    },
    idCell: {
        paddingLeft: theme.spacing(6),
    },
    addRow: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(5),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        cursor: "pointer"
    }
}));

const CustomerSubscriptionsTable = (props) => {
    const { tableContainer, table, cells, idCell, addRow } = useStyles();

    return (
        <TableContainer component={Paper} className={tableContainer}>
            <Table className={table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell className={idCell}>
                            <Typography variant="subtitle1">Subscription ID</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Plan</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Variante</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Precio</Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="subtitle1">Frecuencia</Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="subtitle1">Estado</Typography>
                        </TableCell>

                        <TableCell />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.subscriptions.map((subscription, index) => (
                        <TableRow key={index}>
                            <TableCell className={idCell}>
                                <Typography variant="body1">#{subscription.subscriptionId}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{subscription.plan}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{subscription.variant}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">€{subscription.price}</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography variant="body1">{subscription.frequency}</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography variant="body1">{subscription.status}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <IconButton onClick={() => alert("Redirigir a 'Detalle de suscripción'")}>
                                    <VisibilityIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow className={addRow} onClick={() => alert("Agregar plan")}>
                            <AddCircleIcon color="primary" />
                            <Typography
                                variant="subtitle1"
                                color="primary"
                                style={{ marginLeft: "8px", textTransform: "uppercase"}}
                            >
                                Agregar Plan
                            </Typography>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomerSubscriptionsTable;