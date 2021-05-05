// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
const langs = require("../../../../lang").usersTable;

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

// Internal components
import TablePaginationActions from "./tablePaginationActions";
import SimpleModal from "../../../molecules/simpleModal/simpleModal";

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
    const [users, setUsers] = useState([...props.users]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
    const [selectedUser, setselectedUser] = useState({});
    var lang = langs[router.locale];
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (userId) => {
        router.push({ pathname: "/gestion-de-usuarios/modificar", query: { id: userId.toString() } });
    };

    const handleOpenDeleteModal = (user) => {
        setselectedUser(user);
        setisDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        const res = await deleteUser(selectedUser.id);

        if (res.status === 200) {
            setUsers(users.filter((user) => user.id !== selectedUser.id));
            enqueueSnackbar("Se ha eliminado el usuario correctamente", {
                variant: "success",
            });

            setisDeleteModalOpen(false);
        } else {
            enqueueSnackbar("Error al eliminar el usuario", {
                variant: "error",
            });
        }
    };

    return (
        <>
            {/* TO DO: Cambiar por simpleModal */}
            {isDeleteModalOpen && (
                <SimpleModal
                    cancelButtonText={lang.deleteModal.cancelButton}
                    confirmButtonText={lang.deleteModal.confirmButton}
                    handleCancelButton={() => setisDeleteModalOpen(false)}
                    handleClose={() => setisDeleteModalOpen(false)}
                    handleConfirmButton={handleDelete}
                    open={isDeleteModalOpen}
                    title={lang.deleteModal.title}
                    paragraphs={[lang.deleteModal.text]}
                />
            )}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell component="th" scope="row" className={classes.cells}>
                                <Typography variant="subtitle1">{lang.name}</Typography>
                            </TableCell>
                            <TableCell className={classes.cells}>
                                <Typography variant="subtitle1">{lang.email}</Typography>
                            </TableCell>
                            <TableCell className={classes.cells}>
                                <Typography variant="subtitle1">{lang.role}</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0 ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : users).map((user) => (
                            <TableRow key={user.avatar}>
                                <TableCell className={classes.cells}>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Avatar>{user.avatar}</Avatar>
                                    </div>
                                </TableCell>
                                <TableCell className={classes.cells}>
                                    <Typography variant="body1">{user.fullName}</Typography>
                                </TableCell>
                                <TableCell className={classes.cells}>
                                    <Typography variant="body1">{user.email}</Typography>
                                </TableCell>
                                <TableCell className={classes.cells}>
                                    <Typography variant="body1">{user.role}</Typography>
                                </TableCell>
                                <TableCell className={classes.cells}>
                                    <IconButton onClick={() => handleEdit(user.id)}>
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton onClick={() => handleOpenDeleteModal(user)}>
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
                                count={users.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { "aria-label": "rows per page" },
                                    native: true,
                                }}
                                labelRowsPerPage={lang.rowsPerPage}
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
