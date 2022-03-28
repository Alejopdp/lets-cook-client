// Utils & Config
import React, { useEffect, useState } from "react";

// External components
import { useRouter } from "next/router";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import CreateCustomerForm from "../createCustomerForm/createCustomerForm";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const CreateCustomer = (props) => {
    const { userInfo } = useUserInfoStore();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.CREATE_CUSTOMER)) router.back();

        setIsLoading(false);
    });
    return (
        <>
            <DashboardWithBackTitle title="Crear Cliente" />
            {!isLoading && <CreateCustomerForm />}
        </>
    );
};

export default CreateCustomer;

CreateCustomer.propTypes = {};
