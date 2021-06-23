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
import { Typography } from "@material-ui/core";

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
}));

const events = [
    {
        date: "09/08/2021 15:30 hs.",
        performedBy: "Usuario",
        event: "Se ha realizado un cambio de plan a Plan Ahorro"
    },
    {
        date: "09/08/2021 15:30 hs.",
        performedBy: "Usuario",
        event: "Se ha realizado un cambio en la dirección de entrega"
    },
    {
        date: "09/08/2021 15:30 hs.",
        performedBy: "Administrador",
        event: "Se ha realizado un cambio de plan a Plan Ahorro"
    },
]

const ClientEvents = (props) => {
    const { tableContainer, table, cells, idCell } = useStyles();

    return (
        <TableContainer component={Paper} className={tableContainer}>
            <Table className={table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell className={idCell}>
                            <Typography variant="subtitle1">Fecha</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Usuario</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Evento</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {events.map((event, index) => (
                        <TableRow key={index}>
                            <TableCell className={idCell}>
                                <Typography variant="body1">{event.date}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{event.performedBy}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{event.event}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ClientEvents;