// Utils & Config
import React, { useState, useMemo } from "react";
import { updateBillingData } from "../../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";
import { BillingDataProps } from "../interface";
import { OtherAddressInformation, getFormattedAddressFromGoogle } from "helpers/utils/utils";
// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import BillingDataModal from "./customerInfoModals/billingDataModal";
import ComplexModal from "../../../molecules/complexModal/complexModal";
import { getGeometry } from "helpers/geocode/geocode";
import { Permission } from "helpers/types/permission";
import { useUserInfoStore } from "stores/auth";

const BillingData = (props: BillingDataProps) => {
    const [isBillingDataModalOpen, setBillingDataModalOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        addressName: props.customer.billingData?.addressName || "",
        details: props.customer.billingData?.details || "",
        customerName: props.customer.billingData?.customerName || "",
        identification: props.customer.billingData?.identification || "",
        latitude: props.customer.billingData?.latitude,
        longitude: props.customer.billingData?.longitude,
        city: props.customer.billingData?.city,
        country: props.customer.billingData?.country,
        postalCode: props.customer.billingData?.postalCode,
        province: props.customer.billingData?.province,
    });
    const { userInfo } = useUserInfoStore();

    const canEdit = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.UPDATE_CUSTOMER),
        [userInfo]
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleModifyBillingData = async () => {
        const res = await updateBillingData(props.customer.id, { ...formData });

        if (res.status === 200) {
            props.handleUpdateBillingData(formData);
            setBillingDataModalOpen(false);
            enqueueSnackbar("Datos de facturación modificados", {
                variant: "success",
            });
        } else {
            enqueueSnackbar("No se han podido modificar los datos de facturación", {
                variant: "error",
            });
        }
    };

    const handleGoogleInput = async (address) => {
        const response = await getGeometry(address.description);
        const moreAddresInformation: OtherAddressInformation = getFormattedAddressFromGoogle(response.results[0]?.address_components);

        setFormData({
            ...formData,
            addressName: address.description,
            latitude: response.results[0].geometry.location.lat,
            longitude: response.results[0].geometry.location.lng,
            city: moreAddresInformation.city,
            province: moreAddresInformation.province,
            country: moreAddresInformation.country,
            postalCode: moreAddresInformation.postalCode,
        });
    };

    return (
        <>
            <PaperWithTitleContainer title="Datos de facturación" height={"479px"} flex fullWidth>
                <Typography variant="subtitle2">Dirección</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.billingData?.addressName}
                </Typography>

                <Typography variant="subtitle2">Piso / Puerta / Aclaraciones</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.billingData?.details || "Sin indicar"}
                </Typography>

                <Typography variant="subtitle2">Nombre completo</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.billingData?.customerName}
                </Typography>

                <Typography variant="subtitle2">DNI / NIE / CIF</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.billingData?.identification || "Sin indicar"}
                </Typography>

                {canEdit && (
                    <Typography
                        variant="subtitle2"
                        color="primary"
                        style={{ textTransform: "uppercase", cursor: "pointer", marginTop: "auto" }}
                        onClick={() => setBillingDataModalOpen(true)}
                    >
                        Modificar datos de facturación
                    </Typography>
                )}
            </PaperWithTitleContainer>

            {isBillingDataModalOpen && (
                <ComplexModal
                    title="Modificar dirección de facturación"
                    component={<BillingDataModal handleGoogleInput={handleGoogleInput} formData={formData} handleChange={handleChange} />}
                    open={isBillingDataModalOpen}
                    cancelButtonText="Cancelar"
                    confirmButtonText="Modificar dirección de facturación"
                    handleCancelButton={() => setBillingDataModalOpen(false)}
                    handleConfirmButton={handleModifyBillingData}
                />
            )}
        </>
    );
};

export default BillingData;

BillingData.propTypes = {};
