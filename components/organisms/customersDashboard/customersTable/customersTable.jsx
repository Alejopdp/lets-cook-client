// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// Internal components
import TablePaginationActions from "../../../molecules/tablePaginationActions/tablePaginationActions";

// External components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { TableFooter, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

// Icons & Images
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

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

const CustomersTable = (props) => {
    const { tableContainer, table, cells, idCell } = useStyles();
    const router = useRouter();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.customers.length - page * rowsPerPage);

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
                            <TableCell className={idCell}>
                                <Typography variant="subtitle1">#</Typography>
                            </TableCell>

                            <TableCell className={cells}>
                                <Typography variant="subtitle1">Nombre completo</Typography>
                            </TableCell>

                            <TableCell className={cells}>
                                <Typography variant="subtitle1">Correo electrónico</Typography>
                            </TableCell>

                            <TableCell className={cells}>
                                <Typography variant="subtitle1">Teléfono</Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="subtitle1">Suscripciones activas</Typography>
                            </TableCell>

                            <TableCell />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0 ? props.customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : props.customers).map(
                            (customer, index) => (
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
                                        <Typography variant="body1">{customer.activeSubscriptions}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <IconButton onClick={() => router.push({ pathname: "/gestion-de-clientes/modificar", query: { customerId: customer.id } })}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton onClick={() => props.handleDeleteCustomer(customer)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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