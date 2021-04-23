// Utils & config
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { forgotPassword } from "../../helpers/serverRequests/user";
import { emailRegex } from "../../helpers/regex/index";

// External components

// Internal components
import PaperWithTitleContainer from "../molecules/paperWithTitleContainer/paperWithTitleContainer";
import Success from "./success";
import RecoverFormPassword from "./recoverPasswordForm";

// Icons & Images
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    image: {
        padding: theme.spacing(2),
    },
    center: {
        display: "flex",
        placeItems: "center",
        minHeight: "75vh",
    },
}));

const RecoverPassword = () => {
    const classes = useStyles();

    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false,
    });
    const [success, setsuccess] = useState(false);

    const isEmail = emailRegex.test(values.email);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await forgotPassword(1);

        if (res.status === 200) {
            setsuccess(true);
        } else {
            alert("Error");
        }
    };

    return (
        <>
            <div className={classes.image}>
                <Image src="/logo.png" width={164} height={56} />
            </div>

            <div className={classes.center}>
                <PaperWithTitleContainer title="Recuperar contraseña">
                    {success ? (
                        <Success />
                    ) : (
                        <RecoverFormPassword handleChange={handleChange} isEmail={isEmail} handleSubmit={handleSubmit} />
                    )}
                </PaperWithTitleContainer>
            </div>
        </>
    );
};

export default RecoverPassword;
