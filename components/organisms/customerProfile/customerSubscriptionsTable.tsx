// Utils & Config
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

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
import AddCircleIcon from "@material-ui/icons/AddCircle";

// Internal components
import ComplexModal from "../../molecules/complexModal/complexModal";
import AddPlanModal from "./customerProfileModals/addPlanModal";
import { translateFrequency } from "helpers/i18n/i18n";
import { PlanType } from "types/plan/plan";
import { createSubscription } from "helpers/serverRequests/subscription";
import { PlanFrequencyValue } from "helpers/types/frequency";

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
    addRow: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(5),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        cursor: "pointer",
    },
}));

const CustomerSubscriptionsTable = (props) => {
    const router = useRouter();

    const { tableContainer, table, cells, idCell, addRow } = useStyles();

    const [isAddPlanModalOpen, setAddPlanModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [isAddPlanSubmitting, setIsAddPlanSubmitting] = useState(false);
    const [subscriptions, setSubscriptions] = useState([...props.subscriptions] || []);
    const [selectedPlan, setSelectedPlan] = useState({ variants: [], availablePlanFrecuencies: [] });
    const [selectedVariation, setSelectedVariation] = useState({});
    const [selectedFrequency, setSelectedFrequency] = useState("");

    const handlePlanSelect = (e) => {
        setSelectedPlan(e.target.value);
    };

    const handleVariationSelect = (e) => {
        setSelectedVariation(e.target.value);
    };

    const handleChangeFrequency = (e) => {
        setSelectedFrequency(e.target.value);
    };

    var subscriptionToAdd = {
        subscriptionId: selectedPlan.id,
        plan: selectedPlan.name,
        variant: selectedVariation.name,
        price: selectedVariation.price,
    };

    const handleSetSubscriptions = () => {
        setSubscriptions([...subscriptions, subscriptionToAdd]);
    };

    const handleAddPlan = async () => {
        setIsAddPlanSubmitting(true);
        const data = {
            customerId: props.customerId, // Get customer id from zustand
            planId: selectedPlan.id,
            planVariantId: selectedVariation.id,
            planFrequency: selectedPlan.type === PlanType.Principal ? PlanFrequencyValue.WEEKLY : selectedFrequency,
        };
        const res = await createSubscription(data);

        if (res.status === 200) {
            setAddPlanModalOpen(false);
            enqueueSnackbar("Plan añadido correctamente", {
                variant: "success",
            });

            // handleSetSubscriptions();
        } else {
            enqueueSnackbar("No se ha podido añadir el plan", {
                variant: "error",
            });
        }
        setIsAddPlanSubmitting(false);
    };

    return (
        <>
            <Grid item xs={12}>
                <TableContainer component={Paper} className={tableContainer}>
                    <Table className={table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={idCell}>
                                    <Typography variant="subtitle1">Subscription ID</Typography>
                                </TableCell>

                                <TableCell className={cells}>
                                    <Typography variant="subtitle1">Plan</Typography>
                                </TableCell>

                                <TableCell className={cells}>
                                    <Typography variant="subtitle1">Variante</Typography>
                                </TableCell>

                                <TableCell className={cells}>
                                    <Typography variant="subtitle1">Precio</Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography variant="subtitle1">Frecuencia</Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography variant="subtitle1">Estado</Typography>
                                </TableCell>

                                <TableCell />
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {subscriptions.map((subscription, index) => (
                                <TableRow key={index}>
                                    <TableCell className={idCell}>
                                        <Typography variant="body1">#{subscription.id}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{subscription.plan}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">{subscription.variant}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <Typography variant="body1">€{subscription.price}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{translateFrequency(subscription.frequency)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{subscription.status}</Typography>
                                    </TableCell>
                                    <TableCell className={cells}>
                                        <IconButton
                                            onClick={() =>
                                                router.push({
                                                    pathname: "/suscripciones/detalle",
                                                    query: { subscriptionId: subscription.id },
                                                })
                                            }
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow className={addRow} onClick={() => setAddPlanModalOpen(true)}>
                                <AddCircleIcon color="primary" />
                                <Typography variant="subtitle1" color="primary" style={{ marginLeft: "8px", textTransform: "uppercase" }}>
                                    Agregar Plan
                                </Typography>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {isAddPlanModalOpen && (
                <ComplexModal
                    title="Agregar Plan"
                    component={
                        <AddPlanModal
                            plans={props.plans}
                            handlePlanSelect={handlePlanSelect}
                            handleVariationSelect={handleVariationSelect}
                            selectedPlan={selectedPlan}
                            selectedVariation={selectedVariation}
                            selectedFrequency={selectedFrequency}
                            handleChangeFrequency={handleChangeFrequency}
                        />
                    }
                    open={isAddPlanModalOpen}
                    cancelButtonText="Cancelar"
                    confirmButtonText="Agregar Plan"
                    handleCancelButton={() => setAddPlanModalOpen(false)}
                    handleConfirmButton={handleAddPlan}
                    isConfirmButtonDisabled={isAddPlanSubmitting}
                />
            )}
        </>
    );
};

export default CustomerSubscriptionsTable;
