// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// External components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';

// Icons & Images
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },
    cells: {
        padding: theme.spacing(1),
    },
}));

const zones = [
    {
        name: "Zona 1 - BCN",
        ref: "Sant Marti, Ciutat Vella, L'Eixample, Sant Andreu",
        price: "Gratis",
    },
    {
        name: "Zona 2 - BCN",
        ref: "Sants Montjuic, Les Corts, Sarría-Sant Gervasi",
        price: "5 €",
    },
    {
        name: "Zona 3 - BCN",
        ref: "Horta - Guinardo, Nous Barris, Sant Andreu",
        price: "10 €",
    },
]

const ShippingTable = (props) => {
    const { table, cells } = useStyles();
    const router = useRouter();

    return (
        <TableContainer component={Paper}>
            <Table className={table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell component="th" scope="row" className={cells}>
                            <Typography variant="subtitle1">Nombre</Typography>
                        </TableCell>
                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Referencia</Typography>
                        </TableCell>
                        <TableCell className={cells}>
                            <Typography variant="subtitle1" style={{textAlign: "right"}}>Coste de envío</Typography>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {zones.map((zone, index) => (
                        <TableRow key={index}>
                            <TableCell />
                            <TableCell className={cells}>
                                <Typography variant="body1">{zone.name}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{zone.ref}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1" style={{textAlign: "right"}}>{zone.price}</Typography>
                            </TableCell>
                            <TableCell>
                                <Switch
                                    name="checkedB"
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell className={cells}>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>

                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ShippingTable;

// CustomPaginationActionsTable.propTypes = {
//     users: PropTypes.array.isRequired,
//     handleOpenDeleteModal: PropTypes.func.isRequired,
//     handleEdit: PropTypes.func.isRequired,
// };
