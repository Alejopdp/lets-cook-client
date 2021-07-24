import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from "next/router";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from '@material-ui/icons/Visibility';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        // maxHeight: 440,
    },
});


const OrdersTable = (props) => {
    const classes = useStyles();
    const router = useRouter();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { align: 'left', text: 'Fecha de cobro' },
        { align: 'left', text: 'Cliente' },
        { align: 'left', text: 'Payment Order ID' },
        { align: 'left', text: '# ordenes' },
        { align: 'right', text: 'Monto' },
        { align: 'left', text: 'Estado' },
        { align: 'left', text: '' }
    ]



    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell align={column.align}>{column.text}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => (
                            <TableRow key={row.paymentOrderId}>
                                <TableCell align="left">{row.chargeDate}</TableCell>
                                <TableCell align="left">{row.clientName}</TableCell>
                                <TableCell align="left">{row.paymentOrderId}</TableCell>
                                <TableCell align="left">{row.orderQuantity}</TableCell>
                                <TableCell align="right">{row.orderAmount}</TableCell>
                                <TableCell align="left">{row.state}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => router.push({ pathname: "/ordenes/detalle-orden-de-pago", query: { paymentOrderId: row.paymentOrderId } })} >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default OrdersTable;
