// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

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
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

// Internal components
import TablePaginationActions from "./tablePaginationActions";

// Icons & Images
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteUser } from "../../../../helpers/serverRequests/user";

const useStyles2 = makeStyles((theme) => ({
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

export default function CustomPaginationActionsTable(props) {
    const classes = useStyles2();
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
    const [selectedUser, setselectedUser] = useState({});

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (userId) => {
        router.push(`/gestion-de-usuarios/modificar/${userId}`);
    };

    const handleOpenDeleteModal = (user) => {
        setselectedUser(user);
        setisDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        const res = await deleteUser(selectedUser.id);

        if (res.status === 200) {
            alert("Exito"); // TO DO: Use zustand
            setisDeleteModalOpen(false);
        } else {
            alert("Error");
        }
    };

    return (
        <>
            {/* TO DO: Cambiar por simpleModal */}
            {isDeleteModalOpen && (
                <Dialog open={isDeleteModalOpen} onClose={() => setisDeleteModalOpen(false)}>
                    <DialogTitle>Eliminar usuario</DialogTitle>
                    <DialogContentText item>Estás que quieres eliminar a este usuario</DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setisDeleteModalOpen(false)} color="default" autoFocus>
                            CANCELAR
                        </Button>
                        <Button onClick={handleDelete} className={classes.dangerColor}>
                            ELIMINAR
                        </Button>
                    </DialogActions>
                </Dialog>
            )}{" "}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell component="th" scope="row" className={classes.cells}>
                                <Typography variant="subtitle1">Nombre completo</Typography>
                            </TableCell>
                            <TableCell className={classes.cells}>
                                <Typography variant="subtitle1">Correo electrónico</Typography>
                            </TableCell>
                            <TableCell className={classes.cells}>
                                <Typography variant="subtitle1">Rol</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0 ? props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : props.rows).map(
                            (row) => (
                                <TableRow key={row.avatar}>
                                    <TableCell className={classes.cells}>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <Avatar>{row.avatar}</Avatar>
                                        </div>
                                    </TableCell>
                                    <TableCell className={classes.cells}>
                                        <Typography variant="body1">{row.fullName}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cells}>
                                        <Typography variant="body1">{row.email}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cells}>
                                        <Typography variant="body1">{row.role}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cells}>
                                        <IconButton onClick={() => handleEdit(row.id)}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton onClick={() => handleOpenDeleteModal(row)}>
                                            <DeleteIcon />
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
                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                colSpan={5}
                                // style={{ display: "flex", justifyContent: "center" }}
                                // style={{ display: "flex", margin: "auto", }}
                                count={props.rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { "aria-label": "rows per page" },
                                    native: true,
                                }}
                                labelRowsPerPage="Filas por página:"
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
}
