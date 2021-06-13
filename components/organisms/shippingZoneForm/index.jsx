// Utils & Config
import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
// import { useRequest } from "../../../hooks/useRequest/index";
import { createZone } from "../../../helpers/serverRequests/shipping";
import { useSnackbar } from "notistack";

// External components
import { Box, Grid, Typography, Container } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import Input from "../../atoms/input/input";
import RoundedCheckbox from "../../atoms/roundedCheckbox/roundedCheckbox";
import BackAndCreateButtons from "../../molecules/backAndCreateButtons/backAndCreateButtons";
import FormPaperWithImageDropzone from "../../molecules/formPaperWithImageDropzone/formPaperWithImageDropzone";

const ShippingZoneForm = () => {
    const theme = useTheme();
    const router = useRouter();
    // const { doRequest } = useRequest();
    const { enqueueSnackbar } = useSnackbar();

    const [values, setValues] = useState({
        zoneName: "",
        zoneRef: "",
        free: false,
        pay: false,
        price: "",
        file: [],
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value || event.target.checked });
    };

    const handleCreate = async () => {
        const formData = new FormData();

        formData.append("name", values.zoneName);
        formData.append("reference", values.zoneRef);
        formData.append("cost", values.price);
        formData.append("map", values.file[0]);

        const res = await createZone(formData);

        if (res.status === 200) {
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

    return (
        <Container size="lg">
            <Grid item container spacing={2} justify="center" direction="column">
                <Grid item>
                    <PaperWithTitleContainer title="Detalles" width={600}>
                        <Input label="Nombre" handleChange={handleChange("zoneName")} value={values.zoneName} />
                        <Input label="Referencia" handleChange={handleChange("zoneRef")} value={values.zoneRef} />
                    </PaperWithTitleContainer>
                </Grid>

                <Grid item container direction="column">
                    <PaperWithTitleContainer title="Coste de envío" width={600}>
                        <Grid item>
                            <RoundedCheckbox label="Gratis" onChange={handleChange("free")} checked={values.free} />
                        </Grid>

                        <Grid item>
                            <RoundedCheckbox label="Pago" onChange={handleChange("pay")} checked={values.pay} />
                        </Grid>

                        {values.pay && (
                            <Grid item container direction="row" alignItems="center" spacing={2}>
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

                <Grid item style={{ width: "618px", margin: "0 auto" }}>
                    <FormPaperWithImageDropzone title="Subir archivo KML" handleDropFile={handleDropFile} maxFiles={1} files={values.file}>
                        <Typography variant="body1">Puedes utilizar la siguiente herramienta para crear las zonas de envío:</Typography>

                        <Typography variant="subtitle2" paragraph>
                            <a href="https://mapsengine.google.com/map/" target="blank">
                                https://mapsengine.google.com/map/
                            </a>
                        </Typography>
                    </FormPaperWithImageDropzone>
                </Grid>
            </Grid>

            <Box width={600} display="flex" justifyContent="flex-end" margin="0 auto">
                <BackAndCreateButtons
                    backButtonHandler={() => router.back()}
                    createButtonHandler={handleCreate}
                    createButtonText={"Crear zona de envío"}
                />
            </Box>
        </Container>
    );
};

export default ShippingZoneForm;
