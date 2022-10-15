// Utils & Config
import React, { useEffect, useState, useMemo } from "react";
import { Box, useTheme } from "@material-ui/core";
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
import EditFrequencyModal from "./editFrequencyModal";
import EditRestrictionsModal from "./editRestrictionsModal";
import EditNextChargeDateModal from "./editNextChargeDateModal";
import { translateFrequency } from "helpers/i18n/i18n";
import {
    applyCouponToSubscription,
    cancelSubscription,
    deleteSubscription,
    getDataForSwappingAPlan,
    getSubscriptionById,
    swapPlan,
    updateNextBillingDate,
    updateSubscriptionFrequency,
} from "helpers/serverRequests/subscription";
import DeleteSubscriptionModal from "./deleteSubscriptionModal/deleteSubscriptionModal";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";
import { Subscription } from "components/organisms/customerProfile/interface";
import { SubscriptionState } from "helpers/types/subscriptionState";

const SubscriptionGrid = (props) => {
    const router = useRouter();
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const [subscription, setsubscription] = useState<any>();
    const [openDeleteSubscriptionModal, setOpenDeleteSubscriptionModal] = useState(false);
    const [openCancelSubscriptionModal, setOpenCancelSubscriptionModal] = useState(false);
    const [openEditPlanModal, setOpenEditPlanModal] = useState(false);
    const [openEditPlanVariantModal, setOpenEditPlanVariantModal] = useState(false);
    const [openEditFrequencyModal, setOpenEditFrequencyModal] = useState(false);
    const [openEditNextChargeDateModal, setOpenEditNextChargeDateModal] = useState(false);
    const [openEditRestrictionsModal, setOpenEditRestrictionsModal] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [swapPlanData, setSwapPlanData] = useState({});
    const [reloadCounter, setReloadCounter] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const { userInfo } = useUserInfoStore();
    const [isValidatingPermission, setIsValidatingPermission] = useState(true);
    const [isSwappingPlan, setIsSwappingPlan] = useState(false);

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.VIEW_SUBSCRIPTION)) router.back();

        setIsValidatingPermission(false);
    }, [userInfo]);

    const canEditSubscription = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.UPDATE_SUBSCRIPTION),
        [userInfo]
    );

    useEffect(() => {
        const getInitialData = async () => {
            const [subscriptionRes, swapPlanres] = await Promise.all([
                getSubscriptionById(router.query.subscriptionId),
                getDataForSwappingAPlan(router.query.subscriptionId, router.locale),
            ]);

            if (subscriptionRes && subscriptionRes.status === 200) {
                setsubscription(subscriptionRes.data);
            }

            if (swapPlanres && swapPlanres.status === 200) {
                setSwapPlanData(swapPlanres.data);
            }

            setIsLoading(false);
        };

        getInitialData();
    }, [reloadCounter]);

    // Delete Subscription Modal Functions

    const handleCloseDeleteSubscriptionModal = () => {
        setOpenDeleteSubscriptionModal(false);
    };

    const handleDeleteSubscription = async () => {
        const res = await deleteSubscription(subscription.subscriptionId);

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
        const res = await cancelSubscription(subscription.subscriptionId, reason, comments);

        if (res && res.status === 200) {
            enqueueSnackbar("Suscripción cancelada correctamente", { variant: "success" });
            props.setsubscription({ ...subscription, state: SubscriptionState.SUBSCRIPTION_CANCELLED });
            setOpenCancelSubscriptionModal(false);
            setReloadCounter(reloadCounter + 1);
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

    const handleEditPlan = async (newPlanId, newPlanVariantId) => {
        setIsSwappingPlan(true);
        const res = await swapPlan(subscription.subscriptionId, newPlanId, newPlanVariantId);

        if (res && res.status === 200) {
            setReloadCounter(reloadCounter + 1);
            setOpenEditPlanModal(false);
            enqueueSnackbar("Plan cambiado correctamente", { variant: "success" });
        } else {
            setOpenEditPlanModal(false);
            enqueueSnackbar(res && res.data ? res.data.message : "Ocurrió un error inesperado, intenta nuevamente", { variant: "error" });
        }

        setIsSwappingPlan(false);
    };

    // Edit Plan Variant Modal Functions

    const handleClickOpenEditPlanVariantModal = () => {
        setOpenEditPlanVariantModal(true);
    };

    const handleCloseEditPlanVariantModal = () => {
        setOpenEditPlanVariantModal(false);
    };

    // const handleEditPlanVariant = (planId, newPlanVariantId) => {
    //     alert(`new plan: ${planId}, ${newPlanVariantId}`);
    //     setOpenEditPlanVariantModal(false);
    // };

    // Edit Frequency Modal Functions

    const handleClickOpenEditFrequencyModal = () => {
        setOpenEditFrequencyModal(true);
    };

    const handleCloseEditFrequencyModal = () => {
        setOpenEditFrequencyModal(false);
    };

    const handleEditFrequency = async (frequency) => {
        const res = await updateSubscriptionFrequency(router.query.subscriptionId, frequency);

        if (res && res.status === 200) {
            setReloadCounter(reloadCounter + 1);
            enqueueSnackbar("Frecuencia actualizada correctamente", { variant: "success" });
            setOpenEditFrequencyModal(false);
        } else {
            enqueueSnackbar(res.data.message ?? "Ocurrió un error al actualizar la frecuencia", { variant: "error" });
        }
    };

    // Edit Next Charge Date Modal Functions

    const handleClickOpenEditNextChargeDateModal = () => {
        setOpenEditNextChargeDateModal(true);
    };

    const handleCloseEditNextChargeDateModal = () => {
        setOpenEditNextChargeDateModal(false);
    };

    const handleChangeNextChargeDate = async (date) => {
        const res = await updateNextBillingDate(subscription.subscriptionId, date);

        if (res && res.status === 200) {
            setReloadCounter(reloadCounter + 1);
            setOpenEditNextChargeDateModal(false);
            enqueueSnackbar("Próxima fecha de cobro actualizada correctamente", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message ?? "Ocurrió un error al modificar la fecha de próximo cobro", { variant: "error" });
        }
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
        setIsApplyingCoupon(true);
        const res = await applyCouponToSubscription(subscription.subscriptionId, couponCode, subscription.customerId);

        if (res && res.status === 200) {
            setCouponCode("");
            enqueueSnackbar("Cupón aplicado", { variant: "success" });
            setReloadCounter(reloadCounter + 1);
        } else {
            enqueueSnackbar(res && res.data ? res.data.message : "Ocurrió un error, intenta nuevamente", { variant: "error" });
        }
        setIsApplyingCoupon(false);
    };

    if (isValidatingPermission) return <></>;

    return (
        <>
            {!isLoading && subscription && (
                <>
                    <Grid item xs={12} md={8}>
                        <PaperWithTitleContainer fullWidth={true} title="Información general">
                            <DataDisplay
                                title="Subscription ID"
                                text={subscription.subscriptionId}
                                style={{ marginBottom: theme.spacing(3) }}
                            />
                            <DataDisplay title="Cliente" text={subscription.customerName} style={{ marginBottom: theme.spacing(3) }} />
                            <DataDisplay title="Estado" text={subscription.state} style={{ marginBottom: theme.spacing(3) }} />
                            <DataDisplayEditable
                                title="Plan"
                                text={subscription.plan.planName}
                                handleClick={handleClickOpenEditPlanModal}
                                style={{ marginBottom: theme.spacing(3) }}
                                hideEditButton={!canEditSubscription}
                            />
                            <DataDisplayEditable
                                title="Variante"
                                text={subscription.plan.planVariantDescription}
                                handleClick={handleClickOpenEditPlanVariantModal}
                                style={{ marginBottom: theme.spacing(3) }}
                                hideEditButton
                            />
                            <DataDisplayEditable
                                title="Frecuencia"
                                text={translateFrequency(subscription.frequency)}
                                handleClick={handleClickOpenEditFrequencyModal}
                                style={{ marginBottom: theme.spacing(3) }}
                                hideEditButton={!canEditSubscription}
                            />
                            <DataDisplayEditable
                                title="Próximo cobro"
                                text={subscription.nextBillingDate}
                                handleClick={handleClickOpenEditNextChargeDateModal}
                                style={{ marginBottom: theme.spacing(3) }}
                                hideEditButton={!canEditSubscription}
                            />
                            <DataDisplay
                                title="Método de pago"
                                text={subscription.paymentMethod}
                                style={{ marginBottom: theme.spacing(3) }}
                                hideEditButton={!canEditSubscription}
                            />
                            <DataDisplay
                                title="Dirección de entrega"
                                text={subscription.shippingAddress}
                                style={{ marginBottom: theme.spacing(3) }}
                                hideEditButton={!canEditSubscription}
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <PaperWithTitleContainer fullWidth={true} title="Restricciones">
                                    <DataDisplayEditable
                                        title="Restricción"
                                        text={subscription.restriction.text}
                                        handleClick={handleClickOpenEditRestrictionsModal}
                                        style={{ marginBottom: theme.spacing(2) }}
                                        hideEditButton={!canEditSubscription}
                                    />
                                    <DataDisplay title="Comentarios" text={subscription.restrictionComment} />
                                </PaperWithTitleContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <PaperWithTitleContainer fullWidth={true} title="Detalle del importe">
                                    <AmountDetails data={subscription.amountDetails} />
                                </PaperWithTitleContainer>
                            </Grid>
                            {subscription.state !== SubscriptionState.SUBSCRIPTION_CANCELLED && (
                                <Grid item xs={12}>
                                    <PaperWithTitleContainer fullWidth={true} title="Cupón de descuento">
                                        {!!subscription.coupon?.id && (
                                            <Box marginBottom={2}>
                                                <Link
                                                    onClick={() =>
                                                        router.push({
                                                            pathname: "/cupon",
                                                            query: { id: subscription.coupon.id },
                                                        })
                                                    }
                                                    color="primary"
                                                    style={{ textDecoration: "none", cursor: "pointer", fontWeight: 600 }}
                                                >
                                                    {subscription.coupon.code}
                                                </Link>
                                            </Box>
                                        )}
                                        {canEditSubscription && (
                                            <ApplyCoupon
                                                handleChange={handleChangeCouponInput}
                                                handleClick={handleClickApplyCoupon}
                                                value={couponCode}
                                                isSubmitting={isApplyingCoupon}
                                            />
                                        )}
                                    </PaperWithTitleContainer>
                                </Grid>
                            )}
                            {canEditSubscription && (
                                <Grid item xs={12}>
                                    <PaperWithTitleContainer fullWidth={true} title="Acciones generales">
                                        {subscription.state !== SubscriptionState.SUBSCRIPTION_CANCELLED && (
                                            <div>
                                                <Button
                                                    size="medium"
                                                    style={{ color: "#FC1919" }}
                                                    onClick={handleClickOpenCancelSubscriptionModal}
                                                >
                                                    CANCELAR SUSCRIPCIÓN
                                                </Button>
                                            </div>
                                        )}
                                        {subscription.state === SubscriptionState.SUBSCRIPTION_CANCELLED && (
                                            <div>
                                                <Button
                                                    size="medium"
                                                    style={{ color: "#FC1919" }}
                                                    onClick={() => setOpenDeleteSubscriptionModal(true)}
                                                >
                                                    ELIMINAR SUSCRIPCIÓN
                                                </Button>
                                            </div>
                                        )}
                                    </PaperWithTitleContainer>
                                </Grid>
                            )}
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
                    {openEditPlanModal && (
                        <EditPlanModal
                            open={openEditPlanModal}
                            handleClose={handleCloseEditPlanModal}
                            handlePrimaryButtonClick={handleEditPlan}
                            subscription={subscription}
                            swapPlanData={swapPlanData}
                            isSubmitting={isSwappingPlan}
                        />
                    )}
                    {/* <EditPlanVariantModal
                        open={openEditPlanVariantModal}
                        handleClose={handleCloseEditPlanVariantModal}
                        handlePrimaryButtonClick={handleEditPlanVariant}
                        planId={subscriptionDetail.planId}
                    /> */}
                    <EditFrequencyModal
                        open={openEditFrequencyModal}
                        handleClose={handleCloseEditFrequencyModal}
                        handlePrimaryButtonClick={handleEditFrequency}
                        frequency={subscription.frequency}
                    />
                    <EditRestrictionsModal
                        actualRestriction={subscription.restriction}
                        restrictions={props.restrictions}
                        open={openEditRestrictionsModal}
                        handleClose={handleCloseEditRestrictionsModal}
                        handlePrimaryButtonClick={handleEditRestrictions}
                    />
                    <EditNextChargeDateModal
                        actualNextBillingDate={subscription.nextBillingDate}
                        open={openEditNextChargeDateModal}
                        handleClose={handleCloseEditNextChargeDateModal}
                        handlePrimaryButtonClick={handleChangeNextChargeDate}
                    />
                </>
            )}{" "}
        </>
    );
};

export default SubscriptionGrid;
