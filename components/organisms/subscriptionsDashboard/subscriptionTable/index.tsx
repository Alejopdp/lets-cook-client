// Utils & Config
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { translateFrequency } from "../../../../helpers/i18n/i18n";
import { visuallyHidden } from "@material-ui/utils";

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
import { Box, TableSortLabel } from "@material-ui/core";

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

enum SubscriptionOrderByOptions {
    STATE = "state",
    CUSTOMER_NAME = "customerName",
    AMOUNT = "amount",
}

interface SubscriptionTableProps {
    rows: any;
}

const SubscriptionTable = (props: SubscriptionTableProps) => {
    const { tableContainer, table, cells, idCell } = useStyles();
    const router = useRouter();
    const [order, setOrder] = useState<OrderType>(OrderType.ASC);
    const [orderBy, setOrderBy] = useState<SubscriptionOrderByOptions>("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleRequestSort = (event, property: SubscriptionOrderByOptions) => {
        const isAsc = orderBy === property && order === OrderType.ASC;
        setOrder(isAsc ? OrderType.DESC : OrderType.ASC);
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const getComparator = (order, orderBy) => {
        return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
    };

    return (
        <Grid item xs={12}>
            <TableContainer component={Paper} className={tableContainer}>
                <Table className={table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={idCell}>
                                <Typography variant="subtitle1">Subscription Id</Typography>
                            </TableCell>

                            <TableCell
                                className={cells}
                                sortDirection={orderBy === SubscriptionOrderByOptions.CUSTOMER_NAME ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === SubscriptionOrderByOptions.CUSTOMER_NAME}
                                    direction={orderBy === SubscriptionOrderByOptions.CUSTOMER_NAME ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, SubscriptionOrderByOptions.CUSTOMER_NAME)}
                                >
                                    <Typography variant="subtitle1">Cliente</Typography>
                                </TableSortLabel>
                            </TableCell>

                            <TableCell className={cells}>
                                <Typography variant="subtitle1">Plan</Typography>
                            </TableCell>

                            <TableCell className={cells}>
                                <Typography variant="subtitle1">Variante</Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="subtitle1">Frecuencia</Typography>
                            </TableCell>

                            <TableCell sortDirection={orderBy === SubscriptionOrderByOptions.AMOUNT ? order : false}>
                                <TableSortLabel
                                    active={orderBy === SubscriptionOrderByOptions.AMOUNT}
                                    direction={orderBy === SubscriptionOrderByOptions.AMOUNT ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, SubscriptionOrderByOptions.AMOUNT)}
                                >
                                    <Typography variant="subtitle1">Monto</Typography>
                                </TableSortLabel>
                            </TableCell>

                            <TableCell sortDirection={orderBy === SubscriptionOrderByOptions.STATE ? order : false}>
                                <TableSortLabel
                                    active={orderBy === SubscriptionOrderByOptions.STATE}
                                    direction={orderBy === SubscriptionOrderByOptions.STATE ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, SubscriptionOrderByOptions.STATE)}
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
                                        <Typography variant="body1">{row.id}</Typography>
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
                                        <Typography variant="body1">{row.plan}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{row.planVariant}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{translateFrequency(row.frequency)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{row.amount}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{row.state}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <IconButton
                                            onClick={() =>
                                                router.push({ pathname: "/suscripciones/detalle", query: { subscriptionId: row.id } })
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
};

export default SubscriptionTable;

// CustomPaginationActionsTable.propTypes = {
//     users: PropTypes.array.isRequired,
//     handleOpenDeleteModal: PropTypes.func.isRequired,
//     handleEdit: PropTypes.func.isRequired,
// };
