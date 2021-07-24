// Utils & Config
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from "next/router";

// External Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from '@material-ui/icons/Visibility';
import TablePagination from '@material-ui/core/TablePagination';

// Internal components
import TablePaginationActions from "../../../molecules/tablePaginationActions/tablePaginationActions";

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        // marginTop: theme.spacing(4)
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
        // paddingRight: theme.spacing(5)
    }
}));


const OrdersTable = (props) => {
    const { tableContainer, table, cells, idCell } = useStyles();
    const router = useRouter();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const columns = [
    //     { align: 'left', text: 'Fecha de cobro' },
    //     { align: 'left', text: 'Cliente' },
    //     { align: 'left', text: 'Payment Order ID' },
    //     { align: 'left', text: '# ordenes' },
    //     { align: 'right', text: 'Monto' },
    //     { align: 'left', text: 'Estado' },
    //     { align: 'left', text: '' }
    // ]



    return (
        // <Paper className={classes.root}>
        //     <TableContainer className={classes.container}>
        //         <Table aria-label="simple table">
        //             <TableHead>
        //                 <TableRow>
        //                     {columns.map(column => (
        //                         <TableCell align={column.align}>{column.text}</TableCell>
        //                     ))}
        //                 </TableRow>
        //             </TableHead>
        //             <TableBody>
                        // {props.rows.map((row) => (
                        //     <TableRow key={row.paymentOrderId}>
                        //         <TableCell align="left">{row.chargeDate}</TableCell>
                        //         <TableCell align="left">{row.clientName}</TableCell>
                        //         <TableCell align="left">{row.paymentOrderId}</TableCell>
                        //         <TableCell align="left">{row.orderQuantity}</TableCell>
                        //         <TableCell align="right">{row.orderAmount}</TableCell>
                        //         <TableCell align="left">{row.state}</TableCell>
                        //         <TableCell align="right">
                        //             <IconButton onClick={() => router.push({ pathname: "/ordenes/detalle-orden-de-pago", query: { paymentOrderId: row.paymentOrderId } })} >
                        //                 <VisibilityIcon />
                        //             </IconButton>
                        //         </TableCell>
                        //     </TableRow>
                        // ))}
        //             </TableBody>
        //         </Table>
        //     </TableContainer>
        //     <TablePagination
        //         rowsPerPageOptions={[10, 25, 100]}
        //         component="div"
        //         count={props.rows.length}
        //         rowsPerPage={rowsPerPage}
        //         page={page}
        //         onChangePage={handleChangePage}
        //         onChangeRowsPerPage={handleChangeRowsPerPage}
        //     />
        // </Paper>

    // const columns = [
    //     { align: 'left', text: 'Fecha de cobro' },
    //     { align: 'left', text: 'Cliente' },
    //     { align: 'left', text: 'Payment Order ID' },
    //     { align: 'left', text: '# ordenes' },
    //     { align: 'right', text: 'Monto' },
    //     { align: 'left', text: 'Estado' },
    //     { align: 'left', text: '' }
    // ]

        <Grid item xs={12}>
        <TableContainer component={Paper} className={tableContainer}>
            <Table className={table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell className={idCell}>
                            <Typography variant="subtitle1">Fecha de cobro</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Cliente</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Payment Order ID</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1"># ordenes</Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="subtitle1">Monto</Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="subtitle1">Estado</Typography>
                        </TableCell>

                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : props.rows).map(
                        (row, index) => (
                            <TableRow key={index}>
                                <TableCell className={idCell}>
                                    <Typography variant="body1">{row.chargeDate}</Typography>
                                </TableCell>
                                <TableCell className={cells}>
                                    <Link onClick={() => router.push({ pathname: "/gestion-de-clientes/modificar", query: { customerId: row.client.id } })} color='primary' style={{ textDecoration: 'none', cursor: 'pointer', fontWeight: 600 }} >
                                        {row.client.name}
                                    </Link>
                                </TableCell>
                                <TableCell className={cells}>
                                    <Typography variant="body1">{row.paymentOrderId}</Typography>
                                </TableCell>
                                <TableCell className={cells}>
                                    <Typography variant="body1">{row.orderQuantity}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">{row.orderAmount}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">{row.state}</Typography>
                                </TableCell>
                                <TableCell className={cells}>
                                    <IconButton onClick={() => router.push({ pathname: "/ordenes/detalle-orden-de-pago", query: { paymentOrderId: row.paymentOrderId } })} >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                            colSpan={5}
                            count={props.rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { "aria-label": "rows per page" },
                                native: true,
                            }}
                            labelRowsPerPage="Filas por página"
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </Grid>
    );
}

export default OrdersTable;
