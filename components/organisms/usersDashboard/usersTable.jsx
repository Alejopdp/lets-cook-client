// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";

// Internal components
import Modal from "../../molecules/modal/modal";
import CustomButton from "../../../components/atoms/button/button";

// Icons & Images
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(avatar, name, email, rol) {
    return { avatar, name, email, rol };
}

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
    subtitle: {
        display: "flex",
        alignItems: "center",
        paddingBottom: theme.spacing(3),
    },
}));

export default function CustomPaginationActionsTable(props) {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = () => {
        alert("Edit");
    };

    const handleDelete = () => {
        // alert("Delete");
        setOpen(true);
    };

    return (
        <>
            <Modal open={open} />
            <Grid item container className={classes.subtitle}>
                <Grid item xs>
                    <Typography variant="h5">Gestión de usuarios</Typography>
                </Grid>
                <Grid item>
                    <CustomButton variant="contained" color="primary" size="large" startIcon={<AddIcon />}>
                        <Link href="/gestion-de-usuarios/crear">Crear usuario</Link>
                    </CustomButton>
                </Grid>
            </Grid>

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
                                        <Button onClick={handleEdit}>
                                            <EditIcon fontSize="large" className={classes.actions} />
                                        </Button>

                                        <Button onClick={handleDelete}>
                                            <DeleteIcon fontSize="large" className={classes.actions} />
                                        </Button>
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
