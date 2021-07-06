// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// External components
import Grid from "@material-ui/core/Grid";
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

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        // marginTop: theme.spacing(2)
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

const CustomerPurchaseHistoryTable = (props) => {
    const router = useRouter();
    const { tableContainer, table, cells, idCell } = useStyles();

    return (
        <>
            <Grid item xs={12}>

                <TableContainer component={Paper} className={tableContainer}>
                    <Table className={table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={idCell}>
                                    <Typography variant="subtitle1">Fecha de cobro</Typography>
                                </TableCell>

                                <TableCell className={cells}>
                                    <Typography variant="subtitle1">Payment Order ID</Typography>
                                </TableCell>

                                <TableCell className={cells}>
                                    <Typography variant="subtitle1"># Ordenes</Typography>
                                </TableCell>

                                <TableCell className={cells}>
                                    <Typography variant="subtitle1">Monto</Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography variant="subtitle1">Estado</Typography>
                                </TableCell>

                                <TableCell />
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.purchaseLogs.map((log, index) => (
                                <TableRow key={index}>
                                    <TableCell className={idCell}>
                                        <Typography variant="body1">{log.date}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">#{log.paymentOrderId}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{log.ordersQty}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">€{log.price}</Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography variant="body1">{log.status}</Typography>
                                    </TableCell>

                                    <TableCell className={cells}>
                                        <IconButton onClick={() => router.push({ pathname: "/ordenes/detalle-orden-de-pago", query: { paymentOrderId: log.paymentOrderId } })}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
};

export default CustomerPurchaseHistoryTable;