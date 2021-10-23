// Utils & Config
import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
// import { useRequest } from "../../../hooks/useRequest/index";
import { createZone, updateZone } from "../../../helpers/serverRequests/shipping";
import { useSnackbar } from "notistack";

// External components
import { Box, Grid, Typography, Container } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import Input from "../../atoms/input/input";
import CustomRadioGroup from "../../molecules/radioGroup";
import BackAndCreateButtons from "../../molecules/backAndCreateButtons/backAndCreateButtons";
import FormPaperWithImageDropzone from "../../molecules/formPaperWithImageDropzone/formPaperWithImageDropzone";
import SelectInput from "../../atoms/selectInput/SelectInput";

const shippingZoneTypeOptions = [
    { label: "Gratis", value: "free" },
    { label: "Pago", value: "pay" },
];

const shippingDayOptions = [
    {
        value: 1,
        label: "Lunes",
    },
    {
        value: 2,
        label: "Martes",
    },
    {
        value: 3,
        label: "Miercoles",
    },
    {
        value: 4,
        label: "Jueves",
    },
    {
        value: 5,
        label: "Viernes",
    },
    {
        value: 6,
        label: "Sábado",
    },
    {
        value: 0,
        label: "Domingo",
    },
];

const ShippingZoneForm = (props) => {
    const theme = useTheme();
    const router = useRouter();
    // const { doRequest } = useRequest();
    const { enqueueSnackbar } = useSnackbar();

    const [values, setValues] = useState({
        zoneName: props.shippingZone ? props.shippingZone.name : "",
        zoneRef: props.shippingZone ? props.shippingZone.reference : "",
        price: props.shippingZone ? props.shippingZone.cost : 0,
        type: props.shippingZone && props.shippingZone.cost > 0 ? "pay" : "free",
        shippingDay: props.shippingZone ? props.shippingZone.shippingDayOfWeek : 2,
        file: [],
    });

    const handleChange = (prop) => (event) => {
        var newValues = {
            ...values,
            [prop]: event.target.value,
        };

        if (prop === "type" && event.target.value === "free") {
            newValues = {
                ...newValues,
                price: 0,
            };
        }
        setValues(newValues);
    };

    const handleCreate = async () => {
        const formData = new FormData();

        formData.append("name", values.zoneName);
        formData.append("reference", values.zoneRef);
        formData.append("cost", values.price);
        formData.append("map", values.file[0]);

        const res = props.update ? await updateZone(formData, props.shippingZone.id) : await createZone(formData);

        if (res.status === 200) {
            enqueueSnackbar(`Zona de envío ${props.update ? "creada" : "modificada"} correctamente`, { variant: "success" });
            router.push("/gestion-de-envios");
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleDropFile = (files) => {
        setValues({
            ...values,
            file: files,
        });
    };

    const isValid = () => {
        if (props.update) {
            return !!values.zoneName && !!values.zoneRef && (values.type === "free" || (values.type === "pay" && values.price > 0));
        } else {
            return (
                !!values.zoneName &&
                !!values.zoneRef &&
                (values.type === "free" || (values.type === "pay" && values.price > 0)) &&
                values.file.length > 0
            );
        }
    };

    return (
        <Grid container item spacing={2} justify="center">
            <Grid item xs={12}>
                <PaperWithTitleContainer title="Detalles" fullWidth>
                    <Input label="Nombre" handleChange={handleChange("zoneName")} value={values.zoneName} />
                    <Input label="Referencia" handleChange={handleChange("zoneRef")} value={values.zoneRef} />
                </PaperWithTitleContainer>
            </Grid>

            <Grid item xs={12}>
                <PaperWithTitleContainer title="Coste de envío" fullWidth>
                    <Grid item style={{ marginBottom: theme.spacing(1) }}>
                        <CustomRadioGroup
                            handleChange={handleChange("type")}
                            inputName="type"
                            options={shippingZoneTypeOptions}
                            value={values.type}
                        />
                    </Grid>
                    {values.type === "pay" && (
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item>
                                <Input type="number" label="Valor" handleChange={handleChange("price")} value={values.price} />
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" style={{ marginBottom: theme.spacing(2) }}>
                                    €
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </PaperWithTitleContainer>
            </Grid>

            <Grid item xs={12}>
                <PaperWithTitleContainer title="Día de entrega" fullWidth>
                    <SelectInput
                        name="shippingDay"
                        label="Día de entrega"
                        value={values.shippingDay}
                        handleChange={handleChange("shippingDay")}
                        options={shippingDayOptions}
                    />
                </PaperWithTitleContainer>
            </Grid>

            <Grid item xs={12}>
                <FormPaperWithImageDropzone title="Subir archivo KML" handleDropFile={handleDropFile} maxFiles={1} files={values.file}>
                    <Typography variant="body1">Puedes utilizar la siguiente herramienta para crear las zonas de envío:</Typography>

                    <Typography variant="subtitle2" paragraph>
                        <a href="https://mapsengine.google.com/map/" target="blank">
                            https://mapsengine.google.com/map/
                        </a>
                    </Typography>
                </FormPaperWithImageDropzone>
            </Grid>

            <Grid item xs={12} alignItems="flex-end">
                <BackAndCreateButtons
                    isCreateButtonDisabled={!isValid()}
                    backButtonHandler={() => router.back()}
                    createButtonHandler={handleCreate}
                    createButtonText={`${props.update ? "Modificar" : "Crear"} zona de envío`}
                />
            </Grid>
        </Grid>
    );
};

export default ShippingZoneForm;
