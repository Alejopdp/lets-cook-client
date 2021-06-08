// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { pswRegex } from "../../helpers/regex";
import { generateNewPassword } from "../../helpers/serverRequests/user";

// External components

// Internal components
import PaperWithTitleContainer from "../molecules/paperWithTitleContainer/paperWithTitleContainer";
import NewPasswordForm from "./newPasswordForm";
import Success from "./success";

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

const NewPassword = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
    const [success, setsuccess] = useState(false);

    const isPassword = pswRegex.test(values.password);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values);
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await generateNewPassword(props.email, values.password, props.token);

        if (res.status === 200) {
            setsuccess(true);
        } else {
            console.log(res.data);
            alert("error");
        }
    };

    return (
        <>
            <div className={classes.image}>
                <Image src="/logo.png" width={164} height={56} />
            </div>

            <div className={classes.center}>
                <PaperWithTitleContainer title={props.isTokenValid ? props.lang.title : "Link vencido"}>
                    {success ? (
                        <Success lang={props.lang.success} />
                    ) : !props.isTokenValid ? (
                        <></>
                    ) : (
                        <NewPasswordForm
                            lang={props.lang.form}
                            handleChange={handleChange}
                            handleClickShowPassword={handleClickShowPassword}
                            handleMouseDownPassword={handleMouseDownPassword}
                            handleSubmit={handleSubmit}
                            isPassword={isPassword}
                            showPassword={values.showPassword}
                            password={values.password}
                        />
                    )}
                </PaperWithTitleContainer>
            </div>
        </>
    );
};

NewPassword.propTypes = {
    token: PropTypes.string.isRequired,
    isTokenValid: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    lang: PropTypes.exact({
        title: PropTypes.string.isRequired,
        form: PropTypes.exact({
            passwordPlaceholder: PropTypes.string.isRequired,
            passwordRules: PropTypes.string.isRequired,
            button: PropTypes.string.isRequired,
        }),
        success: PropTypes.exact({
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired,
        }),
    }),
};

export default NewPassword;
