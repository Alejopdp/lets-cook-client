import PropTypes from "prop-types";
import { useRef, useState } from "react";

import {
    Box,
    Container,
    Grid,
    InputAdornment,
    Paper,
    Typography,
    box,
    IconButton,
    Button,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { useStyles } from "./styles";

import DasboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";

import CreateButton from "../../atoms/createButton/createButton";
import Autocomplete from "../../atoms/autocomplete/autocomplete";
import Input from "../../atoms/input/input";
import SimpleSelect from "../../atoms/simpleSelect/SimpleSelect";
import RadioButtons from "../../atoms/radioButtons/radioButtons";

import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import BackAndCreateButtons from "../../molecules/backAndCreateButtons/backAndCreateButtons";
import { Add, Delete } from "@material-ui/icons";
import DatePicker from "../../atoms/datepicker/datepicker";
import CheckboxList from "../../atoms/checkboxList/checkboxList";
import ComplexModal from "../../molecules/complexModal/complexModal";

const buildMinimumBuyComponent = () => (
    <>
        <Grid container>
            <Grid item xs={12} md={6}>
                <Input
                    label="Valor"
                    name="minimumBuy"
                    customProps={{
                        InputProps: {
                            endAdornment: <InputAdornment position="end">EUR</InputAdornment>,
                        },
                    }}
                />
            </Grid>
        </Grid>

        <Alert severity="info" color="success">
            Esta restricción aplicaría solo a un cargo por cliente. Si el cupón tiene otras restricciones, estas se deberán cumplir primero,
            y luego se validará el monto mínimo.
        </Alert>
    </>
);

const buildLimitApplicationHowManyTimeComponent = () => (
    <Grid container direction="column" spacing={1}>
        <Grid item xs={12}>
            <Typography>El cupón será inválido después de…</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <Input
                label="Cantidad"
                name="minimumBuy"
                customProps={{
                    InputProps: {
                        endAdornment: <InputAdornment position="end">Usos</InputAdornment>,
                    },
                }}
            />
        </Grid>
    </Grid>
);

const buildLimitApplicationMoreOfAFeeComponent = () => (
    <Grid container direction="column" spacing={1}>
        <Grid item xs={12}>
            <Typography>Se aplicará el cupón aplicará por los siguientes</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <Input
                label="Cantidad"
                name="minimumBuy"
                customProps={{
                    InputProps: {
                        endAdornment: <InputAdornment position="end">Cargos</InputAdornment>,
                    },
                }}
            />
        </Grid>
    </Grid>
);

const buildSpecificProductsComponent = ({
    products = [],
    productsSelected = [],
    handleChangeProductList = () => {},
    handleDeleteProduct = () => {},
}) => {
    const [openDialogAddProducts, setOpenDialogAddProducts] = useState(false);

    const handleOnChange = (e) => {};

    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Grid container direction="column">
                        {productsSelected.map((product, index) => (
                            <Grid item>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <IconButton onClick={() => handleDeleteProduct(product)}>
                                        <Delete />
                                    </IconButton>
                                    <Typography>
                                        <b>{product.name}</b> {product.type}
                                    </Typography>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item>
                    <Button color="default" variant="contained" startIcon={<Add />} onClick={() => setOpenDialogAddProducts(true)}>
                        Agregar producto
                    </Button>
                </Grid>
            </Grid>
            <ComplexModal
                title="Agregar productos"
                component={<CheckboxList handleOnChange={handleOnChange} items={products.map((product, index)=>({
                    label: <Typography> <b>{product.name}</b> {product.type}</Typography> ,
                    name: product.name
                }))} />}
                cancelButtonText="volver"
                confirmButtonText="Agregar Productos"
                handleConfirmButton={() => setOpenDialogAddProducts(false)}
                handleCancelButton={() => setOpenDialogAddProducts(false)}
                open={openDialogAddProducts}
                handleClose={() => {}}
            />
        </>
    );
};

const CouponsForm = ({ lang = {}, ...props }) => {
    const discountType = ["Precio fijo", "Porcentaje", "Envío gratis"];
    const minimumRequirement = [
        {
            label: "Ninguno",
            value: "Ninguno",
        },
        {
            label: "Monto minimo de compra",
            value: "Monto minimo de compra",
            children: buildMinimumBuyComponent(),
        },
    ];
    const applyToProducts = [
        {
            name: "Plan Vegetariano",
            type: "Principal",
        },
        {
            name: "Plan Ahorro",
            type: "Principal",
        },
        {
            name: "Plan Desayuno",
            type: "Adicional",
        },
    ];
    const applyToSpecificProducts = [applyToProducts[0], applyToProducts[2]];
    const applyTo = [
        {
            label: "Todos los productos",
            value: "Todos los productos",
        },
        {
            label: "Productos específicos",
            value: "Productos específicos",
            children: buildSpecificProductsComponent({
                products: applyToProducts,
                productsSelected: applyToSpecificProducts,
            }),
        },
    ];
    const limitOfApplication = [
        {
            label: "Limitar la cantidad de veces que se puede aplicar este cupón",
            name: "limitNumberCouponApplying",
            // value: PropTypes.string,
            // checked: PropTypes.bool,
            // subtitle: PropTypes.string,
            children: buildLimitApplicationHowManyTimeComponent(),
        },
        {
            label: "Limitar a un solo uso por cliente",
            name: "limitOnlyUseByClient",
            // value: PropTypes.string,
            // checked: PropTypes.bool,
            // subtitle: PropTypes.string,
            // children:<Typography>Test</Typography>,
        },
        {
            label: "Limitar solo para primeros pedidos",
            name: "limiOnlyFirstOrders",
            // value: PropTypes.string,
            // checked: PropTypes.bool,
            // subtitle: PropTypes.string,
            // children:<Typography>Test</Typography>,
        },
    ];
    const howManyTimeCouponCanBeApplied = [
        {
            label: "Solo un cargo",
            value: "Solo un cargo",
            subtitle: "El código de descuento se aplicará a un cargo por cliente antes de caducar.",
        },
        {
            label: "Más de un cargo",
            value: "Más de un cargo",
            subtitle: "El código de descuento se aplicará a una cantidad determinada de cargos por cliente antes de que expire.",
            children: buildLimitApplicationMoreOfAFeeComponent(),
        },
        {
            label: "Todos los cargos",
            value: "Todos los cargos",
            subtitle: "El código de descuento seguirá aplicándose a todos los cargos futuros del cliente.",
        },
    ];

    const classes = useStyles();
    const formRef = useRef();
    const [showExpireDate, setShowExpireDate] = useState(false);

    const _handleGoBack = () => {};

    const _handleChangeLanguage = () => {};
    const _handleClickCreateButton = () => {
        // TODO: Put here all code for get form values.
        const discountCode = formRef.current.discountCode.value;
    };

    return (
        <Grid item xs={12}>
            <form ref={formRef} className={classes.rootForm}>
                <Grid container xs={12} md={9} spacing={2} direction="column">
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <DasboardWithBackTitle title={lang.title || "Cupones"} handleClick={_handleGoBack} />
                        </Box>
                    </Grid>

                    {/* DISCOUNT CODE */}

                    <Grid item>
                        <PaperWithTitleContainer fullWidth={true} title="Código de decuento">
                            <Input label="Código de descuento" name="discountCode" />
                        </PaperWithTitleContainer>
                    </Grid>

                    {/* DISCOUNT TYPE */}

                    <Grid item>
                        <PaperWithTitleContainer fullWidth={true} title="Tipo de descuento">
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs>
                                    <SimpleSelect name="discountType" items={discountType} value={discountType[0]} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Input
                                        label="Valor"
                                        name="discountValue"
                                        customProps={{
                                            InputProps: {
                                                endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </PaperWithTitleContainer>
                    </Grid>

                    {/* MINIMUM REQUIREMENT */}

                    <Grid item>
                        <PaperWithTitleContainer fullWidth title="Requerimientos mínimos">
                            <Grid container spacing={2}>
                                <Grid item xs>
                                    <RadioButtons name="minimumRequirement" items={minimumRequirement} />
                                </Grid>
                            </Grid>
                        </PaperWithTitleContainer>
                    </Grid>

                    {/* APPLY TO */}

                    <Grid item>
                        <PaperWithTitleContainer fullWidth title="Aplica a">
                            <Grid container spacing={2} direction="column">
                                <Grid item xs>
                                    <RadioButtons name="applyTo" items={applyTo} />
                                </Grid>
                            </Grid>
                        </PaperWithTitleContainer>
                    </Grid>

                    {/* APPLICATION LIMIT */}

                    <Grid item>
                        <PaperWithTitleContainer fullWidth title="Limite de aplicación">
                            <Grid container spacing={1} direction="column">
                                <Grid item xs>
                                    <CheckboxList items={limitOfApplication} />
                                </Grid>
                                <Grid item xs>
                                    <Typography>¿Cuántas veces se aplicará el cupón en la suscripción del cliente?</Typography>
                                </Grid>
                                <Grid item xs>
                                    <RadioButtons name="applyTo" useBool={true} items={howManyTimeCouponCanBeApplied} />
                                </Grid>
                            </Grid>
                        </PaperWithTitleContainer>
                    </Grid>

                    {/* DATE RANGE */}

                    <Grid item>
                        <PaperWithTitleContainer fullWidth title="Rango de fechas">
                            <Grid container spacing={2} direction="column">
                                <Grid item xs>
                                    <DatePicker label="Fecha de inicio"></DatePicker>
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
                                        <DatePicker label="Fecha de expiración"></DatePicker>
                                    </Grid>
                                )}
                            </Grid>
                        </PaperWithTitleContainer>
                    </Grid>

                    {/* ACTIONS BUTTONS */}

                    <Grid item xs={12} alignItems="flex-end">
                        <BackAndCreateButtons
                            createButtonHandler={_handleClickCreateButton}
                            createButtonText="Crear Cupón"
                            variant="outline"
                        />
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

CouponsForm.propTypes = {};

CouponsForm.defaultValues = {};

export default CouponsForm;
