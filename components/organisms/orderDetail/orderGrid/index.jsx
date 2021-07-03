// Utils & Config
import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";

// External components
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import DataDisplay from "../../../molecules/dataDisplay/dataDisplay";
import DataDisplayOrderTable from "./dataDisplayOrderTable"
import CancelOrderModal from "./cancelOrderModal"
import SkipWeekModal from "./skipWeekModal"
import EditRecipesModal from './editRecipesModal';
import ActualWeekRecipesDetail from "./actualWeekRecipesDetail"

const OrderGrid = (props) => {
    const orderDetail = {
        orderId: '123',
        clientName: 'Alejo Scotti',
        paymentDate: '10/12/2021',
        deliveryDate: '12/12/2021',
        state: 'Pago exitoso',
        relatedSubscription: {
            subscriptionId: '65',
            planName: 'Plan Familiar',
            planVariantDescription: '3 recetas para 2 personas',
            frequency: 'semanal',
            amount: 20
        },
        relatedPaymentOrderId: {
            paymentOrderId: 123
        }
    }

    const actualWeekOrder = {
        weekName: 'Semana del 1 al 7 de agosto',
        recipes: [
            { id: '123', name: 'Fideos con salsa de ajo' },
            { id: '234', name: 'Pollo al disco' },
            { id: '345', name: 'Tarta de atún' },
        ]
    }

    const recipesListActualWeek = [
        { id: '123', name: 'Fideos con salsa de ajo', quantitySelected: 1 },
        { id: '234', name: 'Pollo al disco', quantitySelected: 1 },
        { id: '345', name: 'Tarta de atún', quantitySelected: 1 },
        { id: '163', name: 'Milanesas a la napolitana', quantitySelected: 0 },
        { id: '237', name: 'Arepas de pernil', quantitySelected: 0 },
        { id: '305', name: 'Tostones de pescado', quantitySelected: 0 },
    ]

    const columns = [
        { align: 'left', text: 'Subscription ID' },
        { align: 'left', text: 'Plan' },
        { align: 'left', text: 'Variante' },
        { align: 'left', text: 'Frecuencia' },
        { align: 'right', text: 'Monto' },
        { align: 'left', text: '' },
    ]

    const rows = [
        { subscriptionId: '324', planName: 'Plan Familiar', planVariantDescription: '3 recetas para 2 personas', frequency: 'Semanal', orderAmount: '30 EU' },
    ]

    const theme = useTheme();
    const [openEditRecipesModal, setOpenEditRecipesModal] = useState(false);
    const [openCancelOrderModal, setOpenCancelOrderModal] = useState(false);
    const [openSkipWeekModal, setOpenSkipWeekModal] = useState(false);
    const [recipesSelection, setRecipesSelection] = useState([]);

    useEffect(() => {
        setRecipesSelection(recipesListActualWeek)
    }, []);

    // Edit Recipes Modal Functions

    const handleClickOpenRecipesModal = () => {
        setOpenEditRecipesModal(true);
    };

    const handleCloseEditRecipesModal = () => {
        setOpenEditRecipesModal(false);
    };

    const handleEditRecipes = () => {
        alert(JSON.stringify(recipesSelection))
        setOpenEditRecipesModal(false);
    }

    const handleEditRecipeQuantity = (recipeId, number) => {
        console.log(recipeId, number)
        const recipesSelectionCopy = recipesSelection;

        let recipeIndexSelected = recipesSelectionCopy.findIndex(recipe => recipe.id === recipeId)
        let recipeToModify = recipesSelectionCopy[recipeIndexSelected]
        recipeToModify['quantitySelected'] += number
        console.log(recipeToModify)
        setRecipesSelection([
            ...recipesSelection.slice(0, recipeIndexSelected),
            recipeToModify,
            ...recipesSelection.slice(recipeIndexSelected + 1),
        ])
    }


    // Skip Week Modal Functions

    const handleClickOpenSkipWeekModal = () => {
        setOpenSkipWeekModal(true);
    };

    const handleCloseSkipWeekModal = () => {
        setOpenSkipWeekModal(false);
    };

    const handleSkipWeek = () => {
        alert('week skipped')
        setOpenSkipWeekModal(false);
    }


    // Cancel Order Modal Functions

    const handleClickOpenCancelOrderModal = () => {
        setOpenCancelOrderModal(true);
    };

    const handleCloseCancelOrderModal = () => {
        setOpenCancelOrderModal(false);
    };

    const handleCancelOrder = () => {
        alert('cancel order')
        setOpenCancelOrderModal(false);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <PaperWithTitleContainer fullWidth={true} title="Información general">
                        <DataDisplay title='Order ID' text={orderDetail.orderId} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Cliente' text={orderDetail.clientName} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Fecha de cobro' text={orderDetail.paymentDate} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Fecha de envío' text={orderDetail.deliveryDate} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Estado' text={orderDetail.state} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplayOrderTable title='Subscripción relacionada' columns={columns} rows={rows} style={{ marginBottom: theme.spacing(3) }} />
                        <DataDisplay title='Payment Order ID relacionada' text={orderDetail.relatedPaymentOrderId.paymentOrderId} style={{ marginBottom: theme.spacing(3) }} />
                        {/* <div>
                            <Button size="medium" style={{ color: '#FC1919' }} onClick={handleClickOpenCancelOrderModal}>
                                CANCELAR ORDEN
                            </Button>
                            <Button size="medium" style={{ color: theme.palette.secondary.main }} onClick={handleClickOpenSkipWeekModal}>
                                SALTAR SEMANA
                            </Button>
                        </div> */}

                    </PaperWithTitleContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Recetas de la semana actual">
                                <ActualWeekRecipesDetail data={actualWeekOrder} handleClick={handleClickOpenRecipesModal} />
                            </PaperWithTitleContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Acciones generales">
                                <div>
                                    <Button size="medium" style={{ color: '#FC1919' }} onClick={handleClickOpenCancelOrderModal}>
                                        CANCELAR ORDEN
                                    </Button>
                                <div>
                                </div>
                                    <Button size="medium" style={{ color: theme.palette.secondary.main }} onClick={handleClickOpenSkipWeekModal}>
                                        SALTAR SEMANA
                                    </Button>
                                </div>
                            </PaperWithTitleContainer>
                        </Grid>
                    </Grid>
                </Grid>




            </Grid>
            <CancelOrderModal
                open={openCancelOrderModal}
                handleClose={handleCloseCancelOrderModal}
                handlePrimaryButtonClick={handleCancelOrder}
            />
            <SkipWeekModal
                open={openSkipWeekModal}
                handleClose={handleCloseSkipWeekModal}
                handlePrimaryButtonClick={handleSkipWeek}
            />
            <EditRecipesModal
                open={openEditRecipesModal}
                handleClose={handleCloseEditRecipesModal}
                handlePrimaryButtonClick={handleEditRecipes}
                handleEditRecipeQuantity={handleEditRecipeQuantity}
                data={recipesSelection}
            />
        </>
    );
};

export default OrderGrid;
