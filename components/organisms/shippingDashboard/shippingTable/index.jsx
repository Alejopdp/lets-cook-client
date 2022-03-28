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
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

// Icons & Images
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },
    cells: {
        padding: theme.spacing(1),
    },
}));

const ShippingTable = ({
    shippingZones = [],
    handleStateClick = () => alert("Not implemented yet"),
    handleDeleteClick = () => alert("Not implemented yet"),
}) => {
    const { table, cells } = useStyles();
    const router = useRouter();
    const { userInfo } = useUserInfoStore();

    const canEdit = useMemo(() => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.UPDATE_SHIPPING_ZONE));
    const canDelete = useMemo(() => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.DELETE_SHIPPING_ZONE));

    return (
        <Grid item xs={12}>
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
                                <Typography variant="subtitle1" style={{ textAlign: "right" }}>
                                    Coste de envío
                                </Typography>
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {shippingZones.map((zone, index) => (
                            <TableRow key={index}>
                                <TableCell />
                                <TableCell className={cells}>
                                    <Typography variant="body1">{zone.name}</Typography>
                                </TableCell>
                                <TableCell className={cells}>
                                    <Typography variant="body1">{zone.reference}</Typography>
                                </TableCell>
                                <TableCell className={cells}>
                                    <Typography variant="body1" style={{ textAlign: "right" }}>
                                        {zone.cost}
                                    </Typography>
                                </TableCell>
                                <TableCell className={cells}>
                                    {canEdit && (
                                        <Switch
                                            name="checkedB"
                                            color="primary"
                                            checked={zone.state.toLowerCase() === "active"}
                                            onClick={() => handleStateClick(zone)}
                                        />
                                    )}
                                    {canEdit && (
                                        <IconButton
                                            onClick={() =>
                                                router.push({ pathname: "/gestion-de-envios/modificar", query: { id: zone.id } })
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    {canDelete && (
                                        <IconButton onClick={() => handleDeleteClick(zone)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    )}{" "}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default ShippingTable;
