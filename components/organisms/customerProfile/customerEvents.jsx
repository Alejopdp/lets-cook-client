// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// External components
import Grid from "@material-ui/core/Grid";
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
        // marginTop: theme.spacing(2)
    },
    table: {
        minWidth: 500,
    },
    cells: {
        padding: theme.spacing(0.5),
        paddingRight: theme.spacing(1),
    },
    idCell: {
        paddingLeft: theme.spacing(6),
    },
}));

const CustomerEvents = (props) => {
    const { tableContainer, table, cells, idCell } = useStyles();

    return (
        <Grid item xs={12}>
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
                        {props.events.map((event, index) => (
                            <TableRow key={index}>
                                <TableCell className={idCell}>
                                    <Typography variant="body1">{event.timestamp}</Typography>
                                </TableCell>
                                <TableCell className={cells}>
                                    <Typography variant="body1">{event.role}</Typography>
                                </TableCell>
                                <TableCell className={cells}>
                                    <Typography variant="body1">{event.action}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default CustomerEvents;
