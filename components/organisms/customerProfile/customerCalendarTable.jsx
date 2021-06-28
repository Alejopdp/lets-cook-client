// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

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
import VisibilityIcon from "@material-ui/icons/Visibility";
import SimpleModal from "../../molecules/simpleModal/simpleModal";

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
    },
}));

const CustomerCalendarTable = (props) => {
    const { tableContainer, table, cells, idCell } = useStyles();

    const [orders, setOrders] = useState([...props.orders] || []);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [isToggleStateModalOpen, setToggleStateModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setToggleStateModalOpen(true)
    }

    const handleToggleState = () => {
        const res = { status: 200 };

        if (res.status === 200) {
            setOrders(orders.map((order) => (order.orderId === selectedOrder.orderId ? { ...selectedOrder, active: !selectedOrder.active} : order)));
            setSelectedOrder({});
            setToggleStateModalOpen(false)
            enqueueSnackbar(`Semana ${selectedOrder.active ? "salteada" : "reanudada"}`, {
                variant: "success",
            });
        } else {
            setToggleStateModalOpen(false)
            enqueueSnackbar(`Error al ${selectedOrder.active ? "saltear la semana" : "reanudar la semana"}`, {
                variant: "error",
            });
        }
    }

    return (
        <>
        <TableContainer component={Paper} className={tableContainer}>
            <Table className={table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell className={idCell}>
                            <Typography variant="subtitle1">Fecha</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Order ID</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Plan</Typography>
                        </TableCell>

                        <TableCell className={cells}>
                            <Typography variant="subtitle1">Variación</Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="subtitle1">Monto</Typography>
                        </TableCell>

                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow key={index}>
                            <TableCell className={idCell}>
                                <Typography variant="body1">{order.date}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{order.orderId}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{order.plan}</Typography>
                            </TableCell>
                            <TableCell className={cells}>
                                <Typography variant="body1">{order.variation}</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography variant="body1">€{order.price}</Typography>
                            </TableCell>

                            <TableCell style={{ textTransform: "uppercase", cursor: "pointer" }}>
                                {order.active
                                    ?
                                        <Typography onClick={() => handleOpenModal(order)} variant="subtitle1" color="primary">
                                            Saltar semana
                                        </Typography>
                                    :
                                        <Typography onClick={() => handleOpenModal(order)} variant="subtitle1" style={{color: "#F8961E"}}>
                                            Reanudar semana
                                        </Typography>
                                }
                            </TableCell>

                            <TableCell className={cells}>
                                <IconButton onClick={() => alert("Redirigir a 'Detalle de la orden'")}>
                                    <VisibilityIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        {isToggleStateModalOpen &&
            <SimpleModal
                title={selectedOrder.active === true ? "Saltar semana" : "Reanudar semana"}
                cancelButtonText="Cancelar"
                confirmButtonText={selectedOrder.active === true ? "Saltar semana" : "Reanudar semana"}
                paragraphs={[
                    selectedOrder.active === true ? "¿Estás seguro de que deseas saltar la siguiente semana?" : "¿Estás seguro de que deseas reanudar la siguiente semana?",
                    `${selectedOrder.plan}`,
                    `${selectedOrder.variation}`,
                    `${selectedOrder.date}`
                ]}
                open={isToggleStateModalOpen}
                handleCancelButton={() => setToggleStateModalOpen(false)}
                handleConfirmButton={handleToggleState}
            />
        }
        </>
    );
};

export default CustomerCalendarTable;