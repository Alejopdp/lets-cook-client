import { useState } from "react";

const useCouponsForm = (initialValues = {}) => {
    const [form, setForm] = useState(initialValues);

    const handleOnChange = ({ target = "" }) => {
        const name = target.name.split("|");
        if (name.length > 1) {
            setForm({
                ...form,
                [name[0]]: {
                    ...form[name[0]],
                    [name[name.length - 1]]: target.value,
                },
            });
        } else {
            setForm({ ...form, [name[0]]: target.value });
        }
    };

    return {
        handleOnChange,
        form,
    };
};

export default useCouponsForm;
