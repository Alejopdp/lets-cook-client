// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
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

const RecoverPassword = (props) => {
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
                <PaperWithTitleContainer title={props.lang.title}>
                    {success ? (
                        <Success lang={props.lang.success} />
                    ) : (
                        <RecoverFormPassword
                            lang={props.lang.form}
                            handleChange={handleChange}
                            isEmail={isEmail}
                            handleSubmit={handleSubmit}
                        />
                    )}
                </PaperWithTitleContainer>
            </div>
        </>
    );
};

export default RecoverPassword;

RecoverPassword.propTypes = {
    lang: PropTypes.exact({
        title: PropTypes.string.isRequired,
        form: PropTypes.exact({
            text: PropTypes.string.isRequired,
            emailPlaceholder: PropTypes.string.isRequired,
            button: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired,
        }),
        success: PropTypes.exact({
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired,
        }),
    }),
};
