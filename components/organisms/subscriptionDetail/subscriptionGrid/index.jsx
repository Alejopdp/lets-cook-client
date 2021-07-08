// Utils & Config
import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";

// External components
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
import EditRestrictionsModal from "./editRestrictionsModal"
import EditNextChargeDateModal from "./editNextChargeDateModal"
// import DataDisplayOrderTable from "./dataDisplayOrderTable"
// import CancelOrderModal from "./cancelOrderModal"
// import SkipWeekModal from "./skipWeekModal"
// import EditRecipesModal from './editRecipesModal';
// import ActualWeekRecipesDetail from "./actualWeekRecipesDetail"

const SubscriptionGrid = (props) => {
    const subscriptionDetail = {
        subscriptionId: '123',
        clientName: 'Alejo Scotti',
        state: 'Activo',
        planId: '1',
        planName: 'Plan Familiar',
        planVariantDescription: '3 recetas para 3 personas',
        frequency: 'Semanal',
        nextPaymentDate: '10/12/2021',
        paymentMethod: 'Mastercard terminada en 1234',
        addressName: 'Av. Fausto Elio 42, 46011, Valencia'
    }

    const restrictions = {
        restriction: {
            value: 'G',
            text: 'Sin glúten',
        },
        comments: 'No como glúten'
    }

    const amountDetail = {
        subtotal: 60,
        shippingCost: 5,
        discount: -5,
        taxes: 6,
        total: 60
    }

    const theme = useTheme();
    const [openCancelSubscriptionModal, setOpenCancelSubscriptionModal] = useState(false);
    const [openEditPlanModal, setOpenEditPlanModal] = useState(false);
    const [openEditPlanVariantModal, setOpenEditPlanVariantModal] = useState(false);
    const [openEditFrequencyModal, setOpenEditFrequencyModal] = useState(false);
    const [openEditNextChargeDateModal, setOpenEditNextChargeDateModal] = useState(false);
    const [openEditRestrictionsModal, setOpenEditRestrictionsModal] = useState(false);
    const [couponCode, setCouponCode] = useState('');


    // Cancel Subscription Modal Functions

    const handleClickOpenCancelSubscriptionModal = () => {
        setOpenCancelSubscriptionModal(true);
    };

    const handleCloseCancelSubscriptionModal = () => {
        setOpenCancelSubscriptionModal(false);
    };

    const handleCancelSubscription = (reason, comments) => {
        alert(`cancel: ${JSON.stringify(reason)}, ${comments}`)
        setOpenCancelSubscriptionModal(false);
    }


    // Edit Plan Modal Functions

    const handleClickOpenEditPlanModal = () => {
        setOpenEditPlanModal(true);
    };

    const handleCloseEditPlanModal = () => {
        setOpenEditPlanModal(false);
    };

    const handleEditPlan = (newPlanId, newPlanVariantId) => {
        alert(`new plan: ${newPlanId}, ${newPlanVariantId}`)
        setOpenEditPlanModal(false);
    }

    // Edit Plan Variant Modal Functions

    const handleClickOpenEditPlanVariantModal = () => {
        setOpenEditPlanVariantModal(true);
    };

    const handleCloseEditPlanVariantModal = () => {
        setOpenEditPlanVariantModal(false);
    };

    const handleEditPlanVariant = (planId, newPlanVariantId) => {
        alert(`new plan: ${planId}, ${newPlanVariantId}`)
        setOpenEditPlanVariantModal(false);
    }

    // Edit Frequency Modal Functions

    const handleClickOpenEditFrequencyModal = () => {
        setOpenEditFrequencyModal(true);
    };

    const handleCloseEditFrequencyModal = () => {
        setOpenEditFrequencyModal(false);
    };

    const handleEditFrequency = frequency => {
        alert(`new frequency: ${frequency}`)
        setOpenEditFrequencyModal(false);
    }


    // Edit Next Charge Date Modal Functions

    const handleClickOpenEditNextChargeDateModal = () => {
        setOpenEditNextChargeDateModal(true);
    };

    const handleCloseEditNextChargeDateModal = () => {
        setOpenEditNextChargeDateModal(false);
    };

    const handleChangeNextChargeDate = date => {
        alert(`new date: ${date}`)
        setOpenEditNextChargeDateModal(false);
    }


    // Edit Restrictions Modal Functions

    const handleClickOpenEditRestrictionsModal = () => {
        setOpenEditRestrictionsModal(true);
    };

    const handleCloseEditRestrictionsModal = () => {
        setOpenEditRestrictionsModal(false);
    };

    const handleEditRestrictions = (restriction, comments) => {
        alert(`new frequency: ${restriction} ${comments}`)
        setOpenEditRestrictionsModal(false);
    }


    // Coupon Functions

    const handleChangeCouponInput = (event) => {
        setCouponCode(event.target.value)
    }

    const handleClickApplyCoupon = () => {
        alert(`apply coupon ${couponCode}`)
        setCouponCode('')
    }

    return (
        <>
                <Grid item xs={12} md={8}>
                    <PaperWithTitleContainer fullWidth={true} title="Información general">
                        <DataDisplay title='Subscription ID' text={subscriptionDetail.subscriptionId} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Cliente' text={subscriptionDetail.clientName} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Estado' text={subscriptionDetail.state} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplayEditable title='Plan' text={subscriptionDetail.planName} handleClick={handleClickOpenEditPlanModal} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplayEditable title='Variante' text={subscriptionDetail.planVariantDescription} handleClick={handleClickOpenEditPlanVariantModal} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplayEditable title='Frecuencia' text={subscriptionDetail.frequency} handleClick={handleClickOpenEditFrequencyModal} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplayEditable title='Próximo cobro' text={subscriptionDetail.nextPaymentDate} handleClick={handleClickOpenEditNextChargeDateModal} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Método de pago' text={subscriptionDetail.paymentMethod} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Dirección de entrega' text={subscriptionDetail.addressName} style={{ marginBottom: theme.spacing(3) }} />
                    </PaperWithTitleContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Restricciones">
                                <DataDisplayEditable title='Rescricción' text={restrictions.restriction.text} handleClick={handleClickOpenEditRestrictionsModal} style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay title='Comentarios' text={restrictions.comments} />
                            </PaperWithTitleContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Detalle del monto">
                                <AmountDetails data={amountDetail} />
                            </PaperWithTitleContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Cupón de descuento">
                                <ApplyCoupon handleChange={handleChangeCouponInput} handleClick={handleClickApplyCoupon} value={couponCode} />
                            </PaperWithTitleContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Acciones generales">
                                <div>
                                    <Button size="medium" style={{ color: '#FC1919' }} onClick={handleClickOpenCancelSubscriptionModal}>
                                        CANCELAR SUSCRIPCIÓN
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
            <EditPlanModal
                open={openEditPlanModal}
                handleClose={handleCloseEditPlanModal}
                handlePrimaryButtonClick={handleEditPlan}
            />
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
