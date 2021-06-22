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

// Icons & Images
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        marginTop: theme.spacing(4)
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

const clients = [
    {
        id: "1",
        fullName: "Santiago Castiella",
        email: "santiago@letscooknow.es",
        phone: "+34 686 281 378",
        activeSubscriptions: 1,
    },
    {
        id: "2",
        fullName: "Santiago Castiella",
        email: "santiago@letscooknow.es",
        phone: "+34 686 281 378",
        activeSubscriptions: 2,
    },
    {
        id: "3",
        fullName: "Santiago Castiella",
        email: "santiago@letscooknow.es",
        phone: "+34 686 281 378",
        activeSubscriptions: 3,
    },
    {
        id: "1",
        fullName: "Santiago Castiella",
        email: "santiago@letscooknow.es",
        phone: "+34 686 281 378",
        activeSubscriptions: 1,
    },
    {
        id: "2",
        fullName: "Santiago Castiella",
        email: "santiago@letscooknow.es",
        phone: "+34 686 281 378",
        activeSubscriptions: 2,
    },
    {
        id: "3",
        fullName: "Santiago Castiella",
        email: "santiago@letscooknow.es",
        phone: "+34 686 281 378",
        activeSubscriptions: 3,
    },
];

const ShippingTable = (props) => {
    const { tableContainer, table, cells, idCell } = useStyles();
    const router = useRouter();

    return (
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
                    {clients.map((client, index) => (
                        <TableRow key={index}>
                            <TableCell className={idCell}>
                                <Typography variant="body1">{client.id}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{client.fullName}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{client.email}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{client.phone}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">{client.activeSubscriptions}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <IconButton onClick={() => router.push({ pathname: "/gestion-de-clientes/modificar", query: { id: client.fullName } })}>
                                    <VisibilityIcon />
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
};

export default ShippingTable;