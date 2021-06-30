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
import EditSubscriptionAttributeModal from "./editSubscriptionAttributeModal";
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
        planName: 'Plan Familiar',
        planVariantDescription: '3 recetas para 3 personas',
        frequency: 'semanal',
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
    const [openEditSubscriptionAttributeModal, setOpenEditSubscriptionAttributeModal] = useState(false);
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


    // Edit Subscription Attribute Modal Functions

    const handleClickOpenEditSubscriptionAttributeModal = () => {
        setOpenEditSubscriptionAttributeModal(true);
    };

    const handleCloseEditSubscriptionAttributeModal = () => {
        setOpenEditSubscriptionAttributeModal(false);
    };

    const handleEditSubscriptionAttribute = (reason, comments) => {
        alert(`cancel: ${JSON.stringify(reason)}, ${comments}`)
        setOpenEditSubscriptionAttributeModal(false);
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
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <PaperWithTitleContainer fullWidth={true} title="Información general">
                        <DataDisplay title='Subscription ID' text={subscriptionDetail.subscriptionId} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Cliente' text={subscriptionDetail.clientName} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Estado' text={subscriptionDetail.state} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplayEditable title='Plan' text={subscriptionDetail.planName} handleClick={handleClickOpenEditSubscriptionAttributeModal} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplayEditable title='Variante' text={subscriptionDetail.planVariantDescription} handleClick={handleClickOpenEditSubscriptionAttributeModal} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplayEditable title='Frecuencia' text={subscriptionDetail.frequency} handleClick={handleClickOpenEditSubscriptionAttributeModal} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplayEditable title='Próximo cobro' text={subscriptionDetail.nextPaymentDate} handleClick={handleClickOpenEditSubscriptionAttributeModal} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Método de pago' text={subscriptionDetail.paymentMethod} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Dirección de entrega' text={subscriptionDetail.addressName} style={{ marginBottom: theme.spacing(3) }} />
                        <Button size="medium" style={{ color: '#FC1919' }} onClick={handleClickOpenCancelSubscriptionModal}>
                            CANCELAR SUSCRIPCIÓN
                        </Button>
                    </PaperWithTitleContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Restricciones">
                                <DataDisplayEditable title='Rescricción' text={restrictions.restriction.text} handleClick={handleClickOpenEditSubscriptionAttributeModal} style={{ marginBottom: theme.spacing(2) }} />
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
                    </Grid>
                </Grid>
            </Grid>
            <CancelSubscriptionModal
                open={openCancelSubscriptionModal}
                handleClose={handleCloseCancelSubscriptionModal}
                handlePrimaryButtonClick={handleCancelSubscription}
            />
            <EditSubscriptionAttributeModal
                open={openEditSubscriptionAttributeModal}
                handleClose={handleCloseEditSubscriptionAttributeModal}
                handlePrimaryButtonClick={handleEditSubscriptionAttribute}
            />
        </>
    );
};

export default SubscriptionGrid;
