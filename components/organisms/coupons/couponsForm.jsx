import { useEffect, useMemo, useRef, useState } from "react";

import { Box, Grid, InputAdornment, Typography, IconButton, Button, FormControlLabel, Checkbox } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Add, Delete } from "@material-ui/icons";

import HeaderTitleWithBackButton from "../../layout/dashboardTitleWithBackButton";
import CardContainerWithTitle from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import FormActionsButtons from "../../molecules/backAndCreateButtons/backAndCreateButtons";
import Input from "../../atoms/input/input";
import SimpleSelect from "../../atoms/simpleSelect/SimpleSelect";
import RadioButtons from "../../atoms/radioButtons/radioButtons";
import DatePicker from "../../atoms/datepicker/datepicker";
import CheckboxList from "../../atoms/checkboxList/checkboxList";
import CustomCheckbox from "../../atoms/checkbox/checkbox";

import { useStyles } from "./styles";
import useCouponsForm from "./useCouponsForm";
import { useRouter } from "next/router";
import SimpleTileList from "../../molecules/simpleTileList/simpleTileList";
import { createCoupon } from "../../../helpers/serverRequests/coupon";
import AddProductsModal from "./addProductsModal";
import { useSnackbar } from "notistack";
import { Permission } from "helpers/types/permission";
import { useUserInfoStore } from "stores/auth";

const buildMinimumBuyComponent = ({ handleOnChangeInputMinimiunRequirement = () => {} }) => (
    <>
        <Grid container>
            <Grid item xs={12} md={6}>
                <Input
                    label="Valor"
                    name="minimumBuy"
                    type="number"
                    customProps={{
                        InputProps: {
                            endAdornment: <InputAdornment position="end">EUR</InputAdornment>,
                        },
                    }}
                    handleChange={(e) => handleOnChangeInputMinimiunRequirement(e.target.value)}
                />
            </Grid>
        </Grid>
        <Alert severity="info" color="success">
            Esta restricción aplicaría solo a un cargo por cliente. Si el cupón tiene otras restricciones, estas se deberán cumplir primero,
            y luego se validará el importe mínimo.
        </Alert>
    </>
);

const buildLimitApplicationHowManyTimeComponent = ({ value = 0, handleChange = () => "Not implemented yet" }) => (
    <Grid container direction="column" spacing={1}>
        <Grid item xs={12}>
            <Typography>El cupón será inválido después de…</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <Input
                label="Cantidad"
                name="minimumBuy"
                value={value}
                type="number"
                handleChange={(e) => handleChange(e.target.value)}
                customProps={{
                    InputProps: {
                        endAdornment: <InputAdornment position="end">Usos</InputAdornment>,
                    },
                }}
            />
        </Grid>
    </Grid>
);

const buildLimitApplicationMoreOfAFeeComponent = ({ value, handleChange }) => (
    <Grid container direction="column" spacing={1}>
        <Grid item xs={12}>
            <Typography>Se aplicará el cupón aplicará por los siguientes</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <Input
                label="Cantidad"
                name="coupons_by_subscription|value"
                type="number"
                value={value}
                handleChange={handleChange}
                customProps={{
                    InputProps: {
                        endAdornment: <InputAdornment position="end">Cargos</InputAdornment>,
                    },
                }}
            />
        </Grid>
    </Grid>
);

const CouponsForm = ({ lang, ...props }) => {
    const frominitialState = {
        couponCode: "",
        discount_type: {
            type: "fix",
            value: "",
        },
        minimum_requirement: {
            type: "none",
            value: "",
        },
        apply_to: {
            type: "all",
            value: [],
        },
        application_limit: [], // [{ "type": "limit_qty | limit_one_customer | first_order",  "value": "double|null" }]
        coupons_by_subscription: {
            type: "only_fee",
            value: 0,
        },
        date_rage: {
            start: new Date(),
            expire: null,
        },
        state: "active",
    };

    const { handleOnChange, defaultFillItems, form, handleApplicationLimitChange, handleQtyLimitChange, getQtyLimitValue } =
        useCouponsForm(frominitialState);

    const { locale, push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const classes = useStyles();
    const [showExpireDate, setShowExpireDate] = useState(false);
    const [isAddProductModalOpen, setisAddProductModalOpen] = useState(false);
    const [selectedPlans, setselectedPlans] = useState([]);
    const { userInfo } = useUserInfoStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.CREATE_COUPON)) router.back();

        setIsLoading(false);
    }, [userInfo]);

    const minimumRequirement = useMemo(
        () => [
            {
                label: lang[locale].minimum_requirement_type[0],
                value: defaultFillItems.minimum_requirement[0],
            },
            {
                label: lang[locale].minimum_requirement_type[1],
                value: defaultFillItems.minimum_requirement[1],
            },
        ],
        [locale]
    );
    const applyTo = useMemo(() => [
        {
            label: lang[locale].apply_to_type[0],
            value: defaultFillItems.apply_to[0],
        },
        {
            label: lang[locale].apply_to_type[1],
            value: defaultFillItems.apply_to[1],
        },
    ]);

    const limitOfApplication = [
        {
            label: "Limitar la cantidad de veces que se puede aplicar este cupón",
            type: defaultFillItems.application_limit[0],
            value: 0,
            children: buildLimitApplicationHowManyTimeComponent({ value: getQtyLimitValue(), handleChange: handleQtyLimitChange }),
        },
        {
            label: "Limitar a un solo uso por cliente",
            type: defaultFillItems.application_limit[1],
            value: null,
        },
        {
            label: "Limitar solo para primeros pedidos",
            type: defaultFillItems.application_limit[2],
            value: null,
        },
    ];

    const howManyTimeCouponCanBeApplied = [
        {
            label: "Solo un cargo",
            value: defaultFillItems.coupons_by_subscription[0],
            // value: null,
            subtitle: "El código de descuento se aplicará a un cargo por cliente antes de caducar.",
        },
        {
            label: "Más de un cargo",
            value: defaultFillItems.coupons_by_subscription[1],
            // value: 2,
            subtitle: "El código de descuento se aplicará a una cantidad determinada de cargos por cliente antes de que expire.",
            children: buildLimitApplicationMoreOfAFeeComponent({ value: form.coupons_by_subscription.value, handleChange: handleOnChange }),
        },
        {
            label: "Todos los cargos",
            value: defaultFillItems.coupons_by_subscription[2],
            // value: null,
            subtitle: "El código de descuento seguirá aplicándose a todos los cargos futuros del cliente.",
        },
    ];

    const _handleGoBack = () => {
        push("/cupones");
    };

    const _handleChangeLanguage = () => {};

    const _handleClickCreateButton = async (e) => {
        e.preventDefault();
        const body = {
            ...form,
            application_limit: form.application_limit.map((limit) => (!!limit.children ? { ...limit, children: "" } : limit)), // Gives circular reference error if any has a children property (a dom element)
        };
        const res = await createCoupon(body);

        if (res.status === 200) {
            enqueueSnackbar("El cupón fue creado correctamente", { variant: "success" });
            push("/cupones");
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleSelectedProductsChange = (newItems) => {
        setselectedPlans(newItems);
        handleOnChange({ target: { name: "apply_to|value", value: newItems } });
        setisAddProductModalOpen(false);
    };

    if (isLoading) return <></>;

    return (
        <Grid item xs={12}>
            {/* <form className={classes.rootForm}> */}
            <Grid container xs={12} spacing={2} direction="column">
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <HeaderTitleWithBackButton title="Crear cupón" handleClick={_handleGoBack} />
                    </Box>
                </Grid>

                {/* DISCOUNT CODE */}

                <Grid item>
                    <CardContainerWithTitle fullWidth={true} title="Código del cupón">
                        <Input label="Código del cupón" name="couponCode" value={form.couponCode} handleChange={handleOnChange} />
                    </CardContainerWithTitle>
                </Grid>

                {/* DISCOUNT TYPE */}

                <Grid item>
                    <CardContainerWithTitle fullWidth={true} title="Tipo de descuento">
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs>
                                <SimpleSelect
                                    name="discount_type|type"
                                    items={lang[locale].discount_type}
                                    values={defaultFillItems.discount_type}
                                    value={form.discount_type.type}
                                    handleChange={handleOnChange}
                                />
                            </Grid>
                            {form.discount_type.type !== defaultFillItems.discount_type[2] && (
                                <Grid item xs={4}>
                                    <Input
                                        label={lang[locale].value}
                                        name="discount_type|value"
                                        value={form.discount_type.value}
                                        handleChange={handleOnChange}
                                        type="number"
                                        customProps={{
                                            InputProps: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {form.discount_type.type === "fix" ? "€" : "%"}
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </CardContainerWithTitle>
                </Grid>

                {/* MINIMUM REQUIREMENT */}

                <Grid item>
                    <CardContainerWithTitle fullWidth title="Requerimientos mínimos">
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <RadioButtons
                                    name="minimum_requirement|type"
                                    items={minimumRequirement}
                                    value={form.minimum_requirement.type}
                                    handleOnChange={handleOnChange}
                                />
                                {form.minimum_requirement.type === defaultFillItems.minimum_requirement[1] && (
                                    <div style={{ paddingTop: 16 }}>
                                        <Grid container>
                                            <Grid item xs={12} md={6}>
                                                <Input
                                                    label={lang[locale].value}
                                                    name="minimum_requirement|value"
                                                    type="number"
                                                    value={form.minimum_requirement.value}
                                                    customProps={{
                                                        InputProps: {
                                                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                                        },
                                                    }}
                                                    handleChange={handleOnChange}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Alert severity="info" color="success">
                                            {lang[locale].minimumRequirementMessage}
                                        </Alert>
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </CardContainerWithTitle>
                </Grid>

                {/* APPLY TO */}

                <Grid item>
                    <CardContainerWithTitle fullWidth title="Aplica a">
                        <Grid container spacing={2} direction="column">
                            <Grid item xs>
                                <RadioButtons
                                    name="apply_to|type"
                                    items={applyTo}
                                    value={form.apply_to.type}
                                    handleOnChange={handleOnChange}
                                />
                                {form.apply_to.type === defaultFillItems.apply_to[1] && (
                                    <SimpleTileList
                                        handleButtonClick={() => setisAddProductModalOpen(true)}
                                        listItemsSelected={selectedPlans}
                                        list={selectedPlans}
                                        handleChangeList={handleSelectedProductsChange}
                                        handleRemoveItem={(item) => setselectedPlans(selectedPlans.filter((plan) => plan.id !== item.id))}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </CardContainerWithTitle>
                </Grid>

                {/* APPLICATION LIMIT */}

                <Grid item>
                    <CardContainerWithTitle fullWidth title="Limite de aplicación">
                        <Grid container spacing={1} direction="column">
                            <Grid item xs>
                                <CheckboxList items={limitOfApplication} handleOnChange={handleApplicationLimitChange} />
                            </Grid>
                            <Grid item xs>
                                <Typography>¿Cuántas veces se aplicará el cupón en la suscripción del cliente?</Typography>
                            </Grid>
                            <Grid item xs>
                                <RadioButtons
                                    name="coupons_by_subscription|type"
                                    items={howManyTimeCouponCanBeApplied}
                                    value={form.coupons_by_subscription.type}
                                    handleOnChange={handleOnChange}
                                    useBold={true}
                                />
                            </Grid>
                        </Grid>
                    </CardContainerWithTitle>
                </Grid>

                {/* DATE RANGE */}

                <Grid item>
                    <CardContainerWithTitle fullWidth title="Rango de fechas">
                        <Grid container spacing={2} direction="column">
                            <Grid item xs>
                                <DatePicker
                                    dateSelected={form.date_rage.start}
                                    label="Fecha de inicio"
                                    handleDateChange={(date) => handleOnChange({ target: { name: "date_rage|start", value: date } })}
                                />
                            </Grid>
                            <Grid item xs>
                                <FormControlLabel
                                    control={<Checkbox name="hasExpirateDate" color="primary" />}
                                    label="Establecer una fecha de expiración"
                                    onChange={(e) => setShowExpireDate(e.target.checked)}
                                />
                            </Grid>
                            {showExpireDate && (
                                <Grid item xs>
                                    <DatePicker
                                        label="Fecha de expiración"
                                        handleDateChange={(date) => handleOnChange({ target: { name: "date_rage|expire", value: date } })}
                                    ></DatePicker>
                                </Grid>
                            )}
                        </Grid>
                    </CardContainerWithTitle>
                </Grid>

                {/* ACTIONS BUTTONS */}

                <Grid item xs={12} alignItems="flex-end">
                    <FormActionsButtons createButtonHandler={_handleClickCreateButton} createButtonText="Crear Cupón" variant="outline" />
                </Grid>
            </Grid>
            {/* </form> */}

            {isAddProductModalOpen && (
                <AddProductsModal
                    cancelButtonText="VOLVER"
                    confirmButtonText="AGREGAR PRODUCTOS"
                    handleCancelButton={() => setisAddProductModalOpen(false)}
                    handleClose={() => setisAddProductModalOpen(false)}
                    handleConfirmButton={handleSelectedProductsChange}
                    selectedPlans={selectedPlans}
                    plans={props.plans}
                    open={isAddProductModalOpen}
                    title="Agregar productos"
                />
            )}
        </Grid>
    );
};

CouponsForm.propTypes = {};

CouponsForm.defaultValues = {};

export default CouponsForm;
