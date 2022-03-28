// Utils & Config
import React from "react";

// External components
import { Container } from "@material-ui/core";

// Internal components
import DashboardWithBackTitle from "../../../components/layout/dashboardTitleWithBackButton";
import ShippingZoneForm from "../shippingZoneForm";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const UpdateShippingZone = (props) => {
    const { userInfo } = useUserInfoStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.UPDATE_SHIPPING_ZONE)) router.back();

        setIsLoading(false);
    }, [userInfo]);
    return (
        <>
            <DashboardWithBackTitle title="Modificar zona de envío" />
            {!isLoading && <ShippingZoneForm shippingZone={props.shippingZone} update={true} />}
        </>
    );
};

export default UpdateShippingZone;
