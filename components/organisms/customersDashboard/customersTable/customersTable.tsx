// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

// Internal components
import TablePaginationActions from "../../../molecules/tablePaginationActions/tablePaginationActions";

// External components
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";
import { TableFooter, TableSortLabel, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";

// Icons & Images
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { exportCustomerActions } from "helpers/serverRequests/customer";

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

enum CustomerOrderByOptions {
    CUSTOMER_NAME = "fullName",
    CUSTOMER_EMAIL = "email",
    ACTIVE_SUBSCRIPTIONS = "activeSubscriptions",
}

const CustomersTable = (props) => {
    const { tableContainer, table, cells, idCell } = useStyles();
    const router = useRouter();
    const [order, setOrder] = useState<OrderType>(OrderType.ASC);
    const [orderBy, setOrderBy] = useState<CustomerOrderByOptions>("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const { enqueueSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (event, property: CustomerOrderByOptions) => {
        const isAsc = orderBy === property && order === OrderType.ASC;
        setOrder(isAsc ? OrderType.DESC : OrderType.ASC);
        setOrderBy(property);
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

    const handleExportCustomerActions = async (customerId: string) => {
        const res = await exportCustomerActions(customerId);
        if (!!!res || res.status !== 200) {
            enqueueSnackbar(!!!res ? "Ha ocurrido un error inesperado" : res.data.message, { variant: "error" });
        }
    };

    return (
        <Grid item xs={12}>
            <TableContainer component={Paper} className={tableContainer}>
                <Table className={table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={idCell}>
                                <Typography variant="subtitle1">#</Typography>
                            </TableCell>

                            <TableCell className={cells} sortDirection={orderBy === CustomerOrderByOptions.CUSTOMER_NAME ? order : false}>
                                <TableSortLabel
                                    active={orderBy === CustomerOrderByOptions.CUSTOMER_NAME}
                                    direction={orderBy === CustomerOrderByOptions.CUSTOMER_NAME ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, CustomerOrderByOptions.CUSTOMER_NAME)}
                                >
                                    <Typography variant="subtitle1">Nombre completo</Typography>
                                </TableSortLabel>
                            </TableCell>

                            <TableCell className={cells} sortDirection={orderBy === CustomerOrderByOptions.CUSTOMER_EMAIL ? order : false}>
                                <TableSortLabel
                                    active={orderBy === CustomerOrderByOptions.CUSTOMER_EMAIL}
                                    direction={orderBy === CustomerOrderByOptions.CUSTOMER_EMAIL ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, CustomerOrderByOptions.CUSTOMER_EMAIL)}
                                >
                                    <Typography variant="subtitle1">Correo electrónico</Typography>
                                </TableSortLabel>
                            </TableCell>

                            <TableCell className={cells}>
                                <Typography variant="subtitle1">Teléfono</Typography>
                            </TableCell>

                            <TableCell sortDirection={orderBy === CustomerOrderByOptions.ACTIVE_SUBSCRIPTIONS ? order : false}>
                                <TableSortLabel
                                    active={orderBy === CustomerOrderByOptions.ACTIVE_SUBSCRIPTIONS}
                                    direction={orderBy === CustomerOrderByOptions.ACTIVE_SUBSCRIPTIONS ? order : OrderType.ASC}
                                    onClick={(e) => handleRequestSort(e, CustomerOrderByOptions.ACTIVE_SUBSCRIPTIONS)}
                                >
                                    <Typography variant="subtitle1">Suscripciones activas</Typography>
                                </TableSortLabel>
                            </TableCell>

                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? props.customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : props.customers)
                            .sort(getComparator(order, orderBy))
                            .map((customer, index) => (
                                <TableRow key={index}>
                                    <TableCell className={idCell}>
                                        <Typography variant="body1">{customer.id}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{customer.fullName}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{customer.email}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{customer.phone1 || customer.phone1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{customer.activeSubscriptions || 0}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Box display="flex">
                                            <IconButton
                                                onClick={() =>
                                                    router.push({
                                                        pathname: "/gestion-de-clientes/modificar",
                                                        query: { customerId: customer.id },
                                                    })
                                                }
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleExportCustomerActions(customer.id)}>
                                                <GetAppIcon />
                                            </IconButton>
                                            <IconButton onClick={() => props.handleDeleteCustomer(customer)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                                colSpan={5}
                                count={props.customers.length}
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

export default CustomersTable;
