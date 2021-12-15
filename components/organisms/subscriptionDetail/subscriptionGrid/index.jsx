// Utils & Config
import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
// External components
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import DataDisplay from "../../../molecules/dataDisplay/dataDisplay";
import DataDisplayEditable from "../../../molecules/dataDisplay/dataDisplayEditable";
import AmountDetails from "../../../molecules/amountDetails";
import ApplyCoupon from "./applyCoupon";
import CancelSubscriptionModal from "./cancelSubscriptionModal";
import EditPlanModal from "./editPlanModal";
import EditPlanVariantModal from "./editPlanVariantModal";
import EditFrequencyModal from "./editFrequencyModal";
import EditRestrictionsModal from "./editRestrictionsModal";
import EditNextChargeDateModal from "./editNextChargeDateModal";
import { PlanFrequencyValue } from "helpers/types/frequency";
import { translateFrequency } from "helpers/i18n/i18n";
import { applyCouponToSubscription, cancelSubscription, deleteSubscription } from "helpers/serverRequests/subscription";
import DeleteSubscriptionModal from "./deleteSubscriptionModal/deleteSubscriptionModal";

const SubscriptionGrid = (props) => {
    const subscriptionDetail = {
        subscriptionId: "123",
        clientName: "Alejo Scotti",
        state: "Activo",
        planId: "1",
        planName: "Plan Familiar",
        planVariantDescription: "3 recetas para 3 personas",
        frequency: PlanFrequencyValue.WEEKLY,
        nextPaymentDate: "10/12/2021",
        paymentMethod: "Mastercard terminada en 1234",
        addressName: "Av. Fausto Elio 42, 46011, Valencia",
    };
    const router = useRouter();
    const theme = useTheme();
    const [openDeleteSubscriptionModal, setOpenDeleteSubscriptionModal] = useState(false);
    const [openCancelSubscriptionModal, setOpenCancelSubscriptionModal] = useState(false);
    const [openEditPlanModal, setOpenEditPlanModal] = useState(false);
    const [openEditPlanVariantModal, setOpenEditPlanVariantModal] = useState(false);
    const [openEditFrequencyModal, setOpenEditFrequencyModal] = useState(false);
    const [openEditNextChargeDateModal, setOpenEditNextChargeDateModal] = useState(false);
    const [openEditRestrictionsModal, setOpenEditRestrictionsModal] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    // Delete Subscription Modal Functions

    const handleCloseDeleteSubscriptionModal = () => {
        setOpenDeleteSubscriptionModal(false);
    };

    const handleDeleteSubscription = async () => {
        const res = await deleteSubscription(props.subscription.subscriptionId);

        if (res && res.status === 200) {
            enqueueSnackbar("Suscripción eliminada correctamente", { variant: "success" });
            setOpenCancelSubscriptionModal(false);
            router.back();
        } else {
            enqueueSnackbar(
                res && res.data
                    ? res.data.message || "Ocurrió un error inesperado, por favor intente nuevamente"
                    : "Ocurrió un error inesperado, por favor intente nuevamente",
                { variant: "error" }
            );
        }
    };

    // Cancel Subscription Modal Functions

    const handleClickOpenCancelSubscriptionModal = () => {
        setOpenCancelSubscriptionModal(true);
    };

    const handleCloseCancelSubscriptionModal = () => {
        setOpenCancelSubscriptionModal(false);
    };

    const handleCancelSubscription = async (reason, comments) => {
        const res = await cancelSubscription(props.subscription.subscriptionId, reason, comments);

        if (res && res.status === 200) {
            enqueueSnackbar("Suscripción cancelada correctamente", { variant: "success" });
            props.setsubscription({ ...props.subscription, state: "SUBSCRIPTION_CANCELLED" });
            setOpenCancelSubscriptionModal(false);
        } else {
            enqueueSnackbar(
                res && res.data
                    ? res.data.message || "Ocurrió un error inesperado, por favor intente nuevamente"
                    : "Ocurrió un error inesperado, por favor intente nuevamente",
                { variant: "error" }
            );
        }
    };

    // Edit Plan Modal Functions

    const handleClickOpenEditPlanModal = () => {
        setOpenEditPlanModal(true);
    };

    const handleCloseEditPlanModal = () => {
        setOpenEditPlanModal(false);
    };

    const handleEditPlan = (newPlanId, newPlanVariantId) => {
        alert(`new plan: ${newPlanId}, ${newPlanVariantId}`);
        setOpenEditPlanModal(false);
    };

    // Edit Plan Variant Modal Functions

    const handleClickOpenEditPlanVariantModal = () => {
        setOpenEditPlanVariantModal(true);
    };

    const handleCloseEditPlanVariantModal = () => {
        setOpenEditPlanVariantModal(false);
    };

    const handleEditPlanVariant = (planId, newPlanVariantId) => {
        alert(`new plan: ${planId}, ${newPlanVariantId}`);
        setOpenEditPlanVariantModal(false);
    };

    // Edit Frequency Modal Functions

    const handleClickOpenEditFrequencyModal = () => {
        setOpenEditFrequencyModal(true);
    };

    const handleCloseEditFrequencyModal = () => {
        setOpenEditFrequencyModal(false);
    };

    const handleEditFrequency = (frequency) => {
        alert(`new frequency: ${frequency}`);
        setOpenEditFrequencyModal(false);
    };

    // Edit Next Charge Date Modal Functions

    const handleClickOpenEditNextChargeDateModal = () => {
        setOpenEditNextChargeDateModal(true);
    };

    const handleCloseEditNextChargeDateModal = () => {
        setOpenEditNextChargeDateModal(false);
    };

    const handleChangeNextChargeDate = (date) => {
        alert(`new date: ${date}`);
        setOpenEditNextChargeDateModal(false);
    };

    // Edit Restrictions Modal Functions

    const handleClickOpenEditRestrictionsModal = () => {
        setOpenEditRestrictionsModal(true);
    };

    const handleCloseEditRestrictionsModal = async () => {
        setOpenEditRestrictionsModal(false);
    };

    const handleEditRestrictions = async (restrictionId, comments) => {
        const status = await props.handleSubmitRestriction(restrictionId, comments);

        if (status === 200) {
            setOpenEditRestrictionsModal(false);
        }
    };

    // Coupon Functions

    const handleChangeCouponInput = (event) => {
        setCouponCode(event.target.value);
    };

    const handleClickApplyCoupon = async () => {
        const res = await applyCouponToSubscription(props.subscription.subscriptionId, couponCode, props.subscription.customerId);

        if (res && res.status === 200) {
            setCouponCode("");
            enqueueSnackbar("Cupón aplicado", { variant: "success" });
        } else {
            enqueueSnackbar(res && res.data ? res.data.message : "Ocurrió un error, intenta nuevamente", { variant: "error" });
        }
    };

    return (
        <>
            <Grid item xs={12} md={8}>
                <PaperWithTitleContainer fullWidth={true} title="Información general">
                    <DataDisplay
                        title="Subscription ID"
                        text={props.subscription.subscriptionId}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                    <DataDisplay title="Cliente" text={props.subscription.customerName} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Estado" text={props.subscription.state} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplayEditable
                        title="Plan"
                        text={props.subscription.plan.planName}
                        handleClick={handleClickOpenEditPlanModal}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                    <DataDisplayEditable
                        title="Variante"
                        text={props.subscription.plan.planVariantDescription}
                        handleClick={handleClickOpenEditPlanVariantModal}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                    <DataDisplayEditable
                        title="Frecuencia"
                        text={translateFrequency(props.subscription.frequency)}
                        handleClick={handleClickOpenEditFrequencyModal}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                    <DataDisplayEditable
                        title="Próximo cobro"
                        text={props.subscription.nextBillingDate}
                        handleClick={handleClickOpenEditNextChargeDateModal}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                    <DataDisplay
                        title="Método de pago"
                        text={props.subscription.paymentMethod}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                    <DataDisplay
                        title="Dirección de entrega"
                        text={props.subscription.shippingAddress}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Restricciones">
                            <DataDisplayEditable
                                title="Restricción"
                                text={props.subscription.restriction.text}
                                handleClick={handleClickOpenEditRestrictionsModal}
                                style={{ marginBottom: theme.spacing(2) }}
                            />
                            <DataDisplay title="Comentarios" text={props.subscription.restrictionComment} />
                        </PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Detalle del importe">
                            <AmountDetails data={props.subscription.amountDetails} />
                        </PaperWithTitleContainer>
                    </Grid>
                    {props.subscription.state !== "SUBSCRIPTION_CANCELLED" && (
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Cupón de descuento">
                                {!!props.subscription.coupon?.id ? (
                                    <Link
                                        onClick={() =>
                                            router.push({
                                                pathname: "/cupon",
                                                query: { id: props.subscription.coupon.id },
                                            })
                                        }
                                        color="primary"
                                        style={{ textDecoration: "none", cursor: "pointer", fontWeight: 600 }}
                                    >
                                        {props.subscription.coupon.code}
                                    </Link>
                                ) : (
                                    <ApplyCoupon
                                        handleChange={handleChangeCouponInput}
                                        handleClick={handleClickApplyCoupon}
                                        value={couponCode}
                                    />
                                )}
                            </PaperWithTitleContainer>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Acciones generales">
                            {props.subscription.state !== "SUBSCRIPTION_CANCELLED" && (
                                <div>
                                    <Button size="medium" style={{ color: "#FC1919" }} onClick={handleClickOpenCancelSubscriptionModal}>
                                        CANCELAR SUSCRIPCIÓN
                                    </Button>
                                </div>
                            )}
                            <div>
                                <Button size="medium" style={{ color: "#FC1919" }} onClick={() => setOpenDeleteSubscriptionModal(true)}>
                                    ELIMINAR SUSCRIPCIÓN
                                </Button>
                            </div>
                        </PaperWithTitleContainer>
                    </Grid>
                </Grid>
            </Grid>
            <CancelSubscriptionModal
                open={openCancelSubscriptionModal}
                handleClose={handleCloseCancelSubscriptionModal}
                handlePrimaryButtonClick={handleCancelSubscription}
            />
            <DeleteSubscriptionModal
                open={openDeleteSubscriptionModal}
                handleClose={handleCloseDeleteSubscriptionModal}
                handlePrimaryButtonClick={handleDeleteSubscription}
            />
            <EditPlanModal open={openEditPlanModal} handleClose={handleCloseEditPlanModal} handlePrimaryButtonClick={handleEditPlan} />
            <EditPlanVariantModal
                open={openEditPlanVariantModal}
                handleClose={handleCloseEditPlanVariantModal}
                handlePrimaryButtonClick={handleEditPlanVariant}
                planId={subscriptionDetail.planId}
            />
            <EditFrequencyModal
                open={openEditFrequencyModal}
                handleClose={handleCloseEditFrequencyModal}
                handlePrimaryButtonClick={handleEditFrequency}
            />
            <EditRestrictionsModal
                actualRestriction={props.subscription.restriction}
                restrictions={props.restrictions}
                open={openEditRestrictionsModal}
                handleClose={handleCloseEditRestrictionsModal}
                handlePrimaryButtonClick={handleEditRestrictions}
            />
            <EditNextChargeDateModal
                open={openEditNextChargeDateModal}
                handleClose={handleCloseEditNextChargeDateModal}
                handlePrimaryButtonClick={handleChangeNextChargeDate}
            />
        </>
    );
};

export default SubscriptionGrid;
