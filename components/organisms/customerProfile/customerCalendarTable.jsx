// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

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
    // const [orderActive, setOrderActive] = useState(selectedOrder.active);
    const [isJumpWeekModalOpen, setJumpWeekModalOpen] = useState(false);
    const [isResumeWeekModalOpen, setResumeWeekModalOpen] = useState(false);

    const handleOpenJumpWeekModal = (order) => {
        setSelectedOrder(order);
        setJumpWeekModalOpen(true);
    }

    const handleOpenResumeWeekModal = (order) => {
        setSelectedOrder(order);
        setResumeWeekModalOpen(true);
    }

    const handleJumpWeek = () => {
        alert("semana salteada")
        setJumpWeekModalOpen(false)
    }

    const handleResumeWeek = () => {
        alert("semana reanudada")
        setResumeWeekModalOpen(false)
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
                                        <Typography onClick={() => handleOpenJumpWeekModal(order)} variant="subtitle1" color="primary">
                                            Saltar semana
                                        </Typography>
                                    :
                                        <Typography onClick={() => handleOpenResumeWeekModal(order)} variant="subtitle1" style={{color: "#F8961E"}}>
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

        {isJumpWeekModalOpen &&
            <SimpleModal
                title="Saltar semana"
                cancelButtonText="Cancelar"
                confirmButtonText="Saltar semana"
                paragraphs={[
                    "¿Estás seguro de que deseas saltar la siguiente semana?",
                    `${selectedOrder.plan}`,
                    `${selectedOrder.variation}`,
                    `${selectedOrder.date}`
                ]}
                open={isJumpWeekModalOpen}
                handleCancelButton={() => setJumpWeekModalOpen(false)}
                handleConfirmButton={handleJumpWeek}
            />
        }

        {isResumeWeekModalOpen &&
            <SimpleModal
                title="Reanudar semana"
                cancelButtonText="Cancelar"
                confirmButtonText="Reanudar semana"
                paragraphs={[
                    "¿Estás seguro de que deseas reanudar la siguiente semana?",
                    `${selectedOrder.plan}`,
                    `${selectedOrder.variation}`,
                    `${selectedOrder.date}`
                ]}
                open={isResumeWeekModalOpen}
                handleCancelButton={() => setResumeWeekModalOpen(false)}
                handleConfirmButton={handleResumeWeek}
            />
        }
        </>
    );
};

export default CustomerCalendarTable;