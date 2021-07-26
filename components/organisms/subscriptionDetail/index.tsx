// Utils & Config
import React, { useState, useEffect } from "react";
import { getSubscriptionById, updateSubscriptionRestriction } from "helpers/serverRequests/subscription";

// External components
import { Container } from "@material-ui/core";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import SubscriptionGrid from "./subscriptionGrid";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getRestrictions } from "helpers/serverRequests/restriction";

const SubscriptionDetail = (props) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [subscription, setsubscription] = useState(null);
    const [restrictions, setrestrictions] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [error, seterror] = useState(false);

    useEffect(() => {
        const getSubscription = async () => {
            const res = await getSubscriptionById(router.query.subscriptionId as string, router.locale);

            if (res.status === 200) {
                setsubscription(res.data);
            } else {
                seterror(true);
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
            setisLoading(false);
        };

        const getAllRestrictions = async () => {
            const res = await getRestrictions(router.locale);

            if (res.status === 200) {
                setrestrictions(res.data);
            } else {
                seterror(true);
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getSubscription();
        getAllRestrictions();
    }, []);

    const handleSubmitRestriction = async (newRestrictionId: string, comment?: string) => {
        const newRestriction = restrictions.find((restriction) => restriction.id === newRestrictionId);
        const res = await updateSubscriptionRestriction(subscription.subscriptionId, newRestrictionId, comment);

        if (res.status === 200) {
            setsubscription({
                ...subscription,
                restriction: { id: newRestriction.id, value: newRestriction.id, text: newRestriction.text },
            });
            enqueueSnackbar("Restricción actualizada correctamente", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }

        return res.status;
    };
    return (
        <>
            <DashboardWithBackTitle title="Detalle de la suscripción" />
            {!!!isLoading && !!!error && (
                <SubscriptionGrid
                    subscription={subscription}
                    restrictions={restrictions}
                    handleSubmitRestriction={handleSubmitRestriction}
                />
            )}
        </>
    );
};

export default SubscriptionDetail;
