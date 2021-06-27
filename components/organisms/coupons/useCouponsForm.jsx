import { useState } from "react";

const useCouponsForm = (initialValues = {}) => {
    const defaultFillItems = {
        discount_type: ["fix", "percent", "free"],
        minimum_requirement: ["none", "amount"],
        apply_to: ["all", "specific"],
        application_limit: ["limit_qty", "limit_one_customer", "first_order"],
        coupons_by_subscription: ["only_fee", "more_one_fee", "all_fee"],
    };

    const [form, setForm] = useState(initialValues);

    const handleOnChange = ({ target = "" }) => {
        const name = target.name.split("|");

        if (name.length > 1) {
            setForm({
                ...form,
                [name[0]]: {
                    ...form[name[0]],
                    [name[1]]: target.value,
                },
            });
        } else {
            setForm({ ...form, [name[0]]: target.value });
        }
    };

    const handleApplicationLimitChange = (limitItem) => {
        setForm({
            ...form,
            application_limit: form.application_limit.some((item) => item.type === limitItem.type)
                ? form.application_limit.filter((item) => item.type !== limitItem.type)
                : [...form.application_limit, limitItem],
        });
    };

    const handleQtyLimitChange = (qty) => {
        setForm({
            ...form,
            application_limit: form.application_limit.map((limit) => (limit.type === "limit_qty" ? { ...limit, value: qty } : limit)),
        });
    };

    const getQtyLimitValue = () => {
        const limitQty = form.application_limit.find((limit) => limit.type === "limit_qty");

        return limitQty ? limitQty.value : 0;
    };

    return {
        defaultFillItems,
        handleOnChange,
        form,
        handleApplicationLimitChange,
        handleQtyLimitChange,
        getQtyLimitValue,
    };
};

export default useCouponsForm;
