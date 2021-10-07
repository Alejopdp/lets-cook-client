// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { toggleWeekState } from "../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { presentNumberWithHashtagAndDotSeparator } from "helpers/utils/utils";

// External components
import Grid from "@material-ui/core/Grid";
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
import { skipOrReactivateOrder } from "helpers/serverRequests/order";
import { OrderState } from "helpers/types/order";

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        // marginTop: theme.spacing(2)
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
    },
}));

const CustomerCalendarTable = (props) => {
    const router = useRouter();
    const { tableContainer, table, cells, idCell } = useStyles();

    const [orders, setOrders] = useState([...props.orders] || []);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [isToggleStateModalOpen, setToggleStateModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setToggleStateModalOpen(true);
    };

    const handleSkipWeek = async () => {
        const res = await skipOrReactivateOrder(selectedOrder);

        if (res.status === 200) {
            enqueueSnackbar(selectedOrder.isSkipped ? "Semana reanudada correctamente " : "Semana saltada correctamente", {
                variant: "success",
            });
            const updatedOrder = {
                ...selectedOrder,
                isSkipped: !selectedOrder.isSkipped,
                active: selectedOrder.isSkipped ? true : false,
            };
            setOrders(orders.map((order) => (order.id === selectedOrder.id ? { ...updatedOrder } : order)));
            setToggleStateModalOpen(false);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setToggleStateModalOpen(false);
    };

    return (
        <>
            <Grid item xs={12}>
                <TableContainer component={Paper} className={tableContainer}>
                    <Table className={table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={idCell}>
                                    <Typography variant="subtitle1">Fecha</Typography>
                                </TableCell>

                                <TableCell className={cells}>
                                    <Typography variant="subtitle1">Número de pedido</Typography>
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
                                        <Typography variant="body1">
                                            {!!order.orderNumber && order.orderNumber !== 0
                                                ? presentNumberWithHashtagAndDotSeparator(order.orderNumber)
                                                : order.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{order.plan}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{order.variation}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">€{order.price}</Typography>
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            textTransform: "uppercase",
                                            cursor: order.state === OrderState.ORDER_BILLED ? "default" : "pointer",
                                        }}
                                    >
                                        {order.state === OrderState.ORDER_BILLED ? (
                                            <></>
                                        ) : order.active ? (
                                            <Typography onClick={() => handleOpenModal(order)} variant="subtitle1" color="primary">
                                                Saltar semana
                                            </Typography>
                                        ) : (
                                            <Typography
                                                onClick={() => handleOpenModal(order)}
                                                variant="subtitle1"
                                                style={{ color: "#F8961E" }}
                                            >
                                                Reanudar semana
                                            </Typography>
                                        )}
                                    </TableCell>

                                    <TableCell className={cells}>
                                        <IconButton
                                            onClick={() => router.push({ pathname: "/ordenes/detalle-orden", query: { id: order.id } })}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {isToggleStateModalOpen && (
                <SimpleModal
                    title={selectedOrder.active === true ? "Saltar semana" : "Reanudar semana"}
                    cancelButtonText="Cancelar"
                    confirmButtonText={selectedOrder.active === true ? "Saltar semana" : "Reanudar semana"}
                    paragraphs={[
                        selectedOrder.active === true
                            ? "¿Estás seguro de que deseas saltar la siguiente semana?"
                            : "¿Estás seguro de que deseas reanudar la siguiente semana?",
                        `${selectedOrder.plan}`,
                        `${selectedOrder.variation}`,
                        `${selectedOrder.date}`,
                    ]}
                    open={isToggleStateModalOpen}
                    handleCancelButton={() => setToggleStateModalOpen(false)}
                    handleConfirmButton={handleSkipWeek}
                />
            )}
        </>
    );
};

export default CustomerCalendarTable;
