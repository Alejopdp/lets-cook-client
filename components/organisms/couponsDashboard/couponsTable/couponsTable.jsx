// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";

// External components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Typography } from "@material-ui/core";

// Internal components
import TablePaginationActions from "./tablePaginationActions";

// Icons & Images
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },
    actions: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    cells: {
        // Creo que se asemeja más al mockup sin este padding!
        padding: theme.spacing(1),
        width: 180,
    },
}));

const CouponsTable = (props) => {
    const classes = useStyles();
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(Math.min(100, props.coupons.length));

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.coupons.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" className={classes.cells}>
                                <Typography variant="subtitle1">Detalles del cupón</Typography>
                            </TableCell>
                            <TableCell className={classes.cells}>
                                <Typography variant="subtitle1">Inicio</Typography>
                            </TableCell>
                            <TableCell className={classes.cells}>
                                <Typography variant="subtitle1">Expiración</Typography>
                            </TableCell>
                            <TableCell className={classes.cells}>
                                <Typography variant="subtitle1">Aplicaciones</Typography>
                            </TableCell>
                            <TableCell className={classes.cells}>
                                <Typography variant="subtitle1">Estado</Typography>
                            </TableCell>
                            <TableCell className={classes.cells}></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0 ? props.coupons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : props.coupons).map(
                            (coupon) => (
                                <TableRow key={coupon.avatar}>
                                    <TableCell className={classes.cells}>
                                        <Typography variant="body1">{coupon.code}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cells}>
                                        <Typography variant="body1">{coupon.date_rage.start}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cells}>
                                        <Typography variant="body1">{coupon.date_rage.expire}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cells}>
                                        <Typography variant="body1">{`${coupon.quantityApplied} de ${
                                            coupon.limites.find((limit) => limit.type === "limit_qty")?.value || "∞"
                                        }`}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cells}>
                                        <Typography variant="body1">{coupon.state}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cells}>
                                        <IconButton onClick={() => router.push({ pathname: "/cupon", query: { id: coupon.id } })}>
                                            <Visibility />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        )}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[50, 100, 250, 500, 1000, { label: "All", value: -1 }]}
                                colSpan={5}
                                count={props.coupons.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { "aria-label": "rows per page" },
                                    native: true,
                                }}
                                labelRowsPerPage="Por página"
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

CouponsTable.propTypes = {};

export default CouponsTable;
