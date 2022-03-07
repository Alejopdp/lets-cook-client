// Utils & Config
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// External Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TablePagination from "@material-ui/core/TablePagination";

// Internal components
import TablePaginationActions from "../../../molecules/tablePaginationActions/tablePaginationActions";
import { roundTwoDecimals } from "helpers/utils/utils";
import { TableSortLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        // marginTop: theme.spacing(4)
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
        // paddingRight: theme.spacing(5)
    },
}));

enum OrderType {
    ASC = "asc",
    DESC = "desc",
}

enum PaymentOrderOrderByOptions {
    BILLING_DATE = "billingDate",
    CUSTOMER_NAME = "customerName",
    AMOUNT = "amount",
    STATE = "state",
    HUMAN_ID = "humanId",
}

const OrdersTable = (props) => {
    const { tableContainer, table, cells, idCell } = useStyles();
    const router = useRouter();
    const [order, setOrder] = useState<OrderType>(OrderType.ASC);
    const [orderBy, setOrderBy] = useState<PaymentOrderOrderByOptions>("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);

    const handleRequestSort = (event, property: PaymentOrderOrderByOptions) => {
        const isAsc = orderBy === property && order === OrderType.ASC;
        setOrder(isAsc ? OrderType.DESC : OrderType.ASC);
        setOrderBy(property);
    };

    function descendingComparator(order1: string, order2: string, orderBy: PaymentOrderOrderByOptions) {
        const val1 = orderBy === PaymentOrderOrderByOptions.BILLING_DATE ? order1[orderBy].split("/").reverse().join("/") : order1[orderBy];
        const val2 = orderBy === PaymentOrderOrderByOptions.BILLING_DATE ? order2[orderBy].split("/").reverse().join("/") : order2[orderBy];

        if (val2 < val1) {
            return -1;
        }
        if (val2 > val1) {
            return 1;
        }
        return 0;
    }

    const getComparator = (order: OrderType, orderBy: PaymentOrderOrderByOptions) => {
        return order === "desc"
            ? (val1, val2) => descendingComparator(val1, val2, orderBy)
            : (val1, val2) => -descendingComparator(val1, val2, orderBy);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid item xs={12}>
            <TableContainer component={Paper} className={tableContainer}>
                <Table className={table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className={idCell}
                                sortDirection={orderBy === PaymentOrderOrderByOptions.BILLING_DATE ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === PaymentOrderOrderByOptions.BILLING_DATE}
                                    direction={orderBy === PaymentOrderOrderByOptions.BILLING_DATE ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, PaymentOrderOrderByOptions.BILLING_DATE)}
                                >
                                    <Typography variant="subtitle1">Fecha de cobro</Typography>
                                </TableSortLabel>
                            </TableCell>

                            <TableCell
                                className={cells}
                                sortDirection={orderBy === PaymentOrderOrderByOptions.CUSTOMER_NAME ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === PaymentOrderOrderByOptions.CUSTOMER_NAME}
                                    direction={orderBy === PaymentOrderOrderByOptions.CUSTOMER_NAME ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, PaymentOrderOrderByOptions.CUSTOMER_NAME)}
                                >
                                    <Typography variant="subtitle1">Cliente</Typography>
                                </TableSortLabel>
                            </TableCell>

                            <TableCell className={cells}>
                                <TableSortLabel
                                    active={orderBy === PaymentOrderOrderByOptions.HUMAN_ID}
                                    direction={orderBy === PaymentOrderOrderByOptions.HUMAN_ID ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, PaymentOrderOrderByOptions.HUMAN_ID)}
                                >
                                    <Typography variant="subtitle1">Payment Order ID</Typography>
                                </TableSortLabel>
                            </TableCell>

                            <TableCell className={cells}>
                                <Typography variant="subtitle1"># ordenes</Typography>
                            </TableCell>

                            <TableCell sortDirection={orderBy === PaymentOrderOrderByOptions.AMOUNT ? order : false}>
                                <TableSortLabel
                                    active={orderBy === PaymentOrderOrderByOptions.AMOUNT}
                                    direction={orderBy === PaymentOrderOrderByOptions.AMOUNT ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, PaymentOrderOrderByOptions.AMOUNT)}
                                >
                                    <Typography variant="subtitle1">Monto</Typography>
                                </TableSortLabel>
                            </TableCell>

                            <TableCell sortDirection={orderBy === PaymentOrderOrderByOptions.STATE ? order : false}>
                                <TableSortLabel
                                    active={orderBy === PaymentOrderOrderByOptions.STATE}
                                    direction={orderBy === PaymentOrderOrderByOptions.STATE ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, PaymentOrderOrderByOptions.STATE)}
                                >
                                    <Typography variant="subtitle1">Estado</Typography>
                                </TableSortLabel>
                            </TableCell>

                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : props.rows)
                            .sort(getComparator(order, orderBy))
                            .map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell className={idCell}>
                                        <Typography variant="body1">{row.billingDate}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Link
                                            onClick={() =>
                                                router.push({
                                                    pathname: "/gestion-de-clientes/modificar",
                                                    query: { customerId: row.customerId },
                                                })
                                            }
                                            color="primary"
                                            style={{ textDecoration: "none", cursor: "pointer", fontWeight: 600 }}
                                        >
                                            {row.customerName}
                                        </Link>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{row.humanId}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{row.orderQuantity}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{roundTwoDecimals(row.amount)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{row.state}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <IconButton
                                            onClick={() =>
                                                router.push({
                                                    pathname: "/ordenes/detalle-orden-de-pago",
                                                    query: { paymentOrderId: row.id },
                                                })
                                            }
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[50, 100, 250, 500, 1000, { label: "Todos", value: -1 }]}
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
};

export default OrdersTable;
