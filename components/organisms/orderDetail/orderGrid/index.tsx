// Utils & Config
import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";

// External components
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import DataDisplay from "../../../molecules/dataDisplay/dataDisplay";
import DataDisplayOrderTable from "./dataDisplayOrderTable";
import CancelOrderModal from "./cancelOrderModal";
import SkipWeekModal from "./skipWeekModal";
import EditRecipesModal from "./editRecipesModal";
import ActualWeekRecipesDetail from "./actualWeekRecipesDetail";
import { chooseRecipesForOrder, skipOrReactivateOrder } from "helpers/serverRequests/order";
import { useSnackbar } from "notistack";
import { presentNumberWithHashtagAndDotSeparator } from "helpers/utils/utils";

const columns = [
    { align: "left", text: "Subscription ID" },
    { align: "left", text: "Plan" },
    { align: "left", text: "Variante" },
    { align: "left", text: "Frecuencia" },
    { align: "right", text: "Monto" },
    { align: "left", text: "" },
];
const OrderGrid = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const [openEditRecipesModal, setOpenEditRecipesModal] = useState(false);
    const [openCancelOrderModal, setOpenCancelOrderModal] = useState(false);
    const [openSkipWeekModal, setOpenSkipWeekModal] = useState(false);
    const [recipesSelection, setRecipesSelection] = useState<[{ recipeId: string; quantity: number; recipeVariant: string; name: string }]>(
        []
    );

    useEffect(() => {
        const baseSelection = [];
        for (let weekRecipe of props.weekRecipes) {
            const selectedRecipe = props.order.recipes.find((recipe) => recipe.id === weekRecipe.id);

            baseSelection.push({
                recipeId: weekRecipe.id,
                recipeVariant: "",
                quantity: selectedRecipe ? selectedRecipe.quantity : 0,
                name: weekRecipe.name,
            });
        }

        setRecipesSelection(baseSelection);
    }, []);

    // Edit Recipes Modal Functions

    const handleClickOpenRecipesModal = () => {
        setOpenEditRecipesModal(true);
    };

    const handleCloseEditRecipesModal = () => {
        setOpenEditRecipesModal(false);
    };

    const handleEditRecipes = async () => {
        const res = await chooseRecipesForOrder(props.order.id, props.order.subscription.subscriptionId, recipesSelection);

        if (res.status === 200) {
            setOpenEditRecipesModal(false);
            enqueueSnackbar("Recetas actualizadas correctamente", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleEditRecipeQuantity = (recipeId, number) => {
        const recipesSelectionCopy = recipesSelection;
        let recipeIndexSelected = recipesSelectionCopy.findIndex((recipe) => recipe.recipeId === recipeId);
        let recipeToModify = recipesSelectionCopy[recipeIndexSelected];
        if (recipeToModify.quantity === 0 && number < 0) {
            return false;
        } else {
            recipeToModify["quantity"] += number;
            setRecipesSelection([
                ...recipesSelection.slice(0, recipeIndexSelected),
                recipeToModify,
                ...recipesSelection.slice(recipeIndexSelected + 1),
            ]);
        }
    };

    // Skip Week Modal Functions

    const handleClickOpenSkipWeekModal = () => {
        setOpenSkipWeekModal(true);
    };

    const handleCloseSkipWeekModal = () => {
        setOpenSkipWeekModal(false);
    };

    const handleSkipWeek = async () => {
        const res = await skipOrReactivateOrder(props.order);

        if (res.status === 200) {
            enqueueSnackbar("Semana saltada correctamente", { variant: "success" });
            props.setorder({
                ...props.order,
                isSkipped: !props.order.isSkipped,
                state: props.order.isSkipped ? "ORDER_ACTIVE" : "ORDER_SKIPPED",
            });
            handleCloseSkipWeekModal();
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setOpenSkipWeekModal(false);
    };

    // Cancel Order Modal Functions

    const handleClickOpenCancelOrderModal = () => {
        setOpenCancelOrderModal(true);
    };

    const handleCloseCancelOrderModal = () => {
        setOpenCancelOrderModal(false);
    };

    const handleCancelOrder = () => {
        alert("cancel order");
        setOpenCancelOrderModal(false);
    };

    return (
        <>
            <Grid item xs={12} md={8}>
                <PaperWithTitleContainer fullWidth={true} title="Información general">
                    <DataDisplay
                        title="Número de pedido"
                        text={
                            props.order.number && props.order.number !== 0
                                ? presentNumberWithHashtagAndDotSeparator(props.order.number)
                                : props.order.id
                        }
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                    <DataDisplay title="Cliente" text={props.order.customerName} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Fecha de cobro" text={props.order.billingDate} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Fecha de envío" text={props.order.shippingDate} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Estado" text={props.order.state} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplayOrderTable
                        title="Subscripción relacionada"
                        columns={columns}
                        rows={[props.order.subscription]}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                    <DataDisplay
                        title="Payment Order ID relacionada"
                        text={props.order.paymentOrderId}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Recetas de la semana actual">
                            <ActualWeekRecipesDetail
                                data={{ weekName: props.order.weekLabel, recipes: props.order.recipes }}
                                handleClick={handleClickOpenRecipesModal}
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Acciones generales">
                            <div>
                                <Button size="medium" style={{ color: "#FC1919" }} onClick={handleClickOpenCancelOrderModal}>
                                    CANCELAR ORDEN
                                </Button>
                            </div>
                            <div>
                                <Button
                                    size="medium"
                                    style={{ color: theme.palette.secondary.main }}
                                    onClick={handleClickOpenSkipWeekModal}
                                >
                                    {props.order.isSkipped ? "REACTIVAR SEMANA" : "SALTAR SEMANA"}
                                </Button>
                            </div>
                        </PaperWithTitleContainer>
                    </Grid>
                </Grid>
            </Grid>
            <CancelOrderModal
                open={openCancelOrderModal}
                handleClose={handleCloseCancelOrderModal}
                handlePrimaryButtonClick={handleCancelOrder}
            />
            <SkipWeekModal open={openSkipWeekModal} handleClose={handleCloseSkipWeekModal} handlePrimaryButtonClick={handleSkipWeek} />
            <EditRecipesModal
                open={openEditRecipesModal}
                handleClose={handleCloseEditRecipesModal}
                handlePrimaryButtonClick={handleEditRecipes}
                handleEditRecipeQuantity={handleEditRecipeQuantity}
                data={recipesSelection}
                recipesQuantity={props.order.numberOfRecipes}
            />
        </>
    );
};

export default OrderGrid;
