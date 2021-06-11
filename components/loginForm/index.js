// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { login } from "../../helpers/serverRequests/user";
import { useRouter } from "next/router";
import { setItemInLocalStorage } from "../../helpers/localStorage/localStorage";
import { useUserInfoStore } from "../../stores/auth";
import { useStyles } from "./styles";
import cookies from "js-cookie";

// External components
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

// Internal components
import { emailRegex, pswRegex } from "../../helpers/regex";
import Button from "../atoms/button/button";
import PaperWithTitleContainer from "../molecules/paperWithTitleContainer/paperWithTitleContainer";

// Icons & Images
import Image from "next/image";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const LoginForm = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false,
    });
    const [serverError, setserverError] = useState(false);
    const [isSubmitting, setisSubmitting] = useState(false);
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);

    const isEmail = emailRegex.test(values.email);
    const isPassword = pswRegex.test(values.password);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisSubmitting(true);
        const res = await login(values.email, values.password);

        if (res.status === 200) {
            setItemInLocalStorage("token", res.data.token);
            setItemInLocalStorage("userInfo", res.data.userInfo);
            setUserInfo(res.data.userInfo);
            cookies.set("token", res.data.token);
            router.push("/dashboard");
        } else {
            setserverError(res.data.message);
        }
        setisSubmitting(false);
    };

    return (
        <>
            <div className={classes.image}>
                <Image src="/logo.png" width={164} height={56} />
            </div>

            <div className={classes.center}>
                <PaperWithTitleContainer title={props.lang.title}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <TextField
                                id="outlined-basic"
                                label={props.lang.emailPlaceholder}
                                variant="outlined"
                                type="email"
                                onChange={handleChange("email")}
                            />
                        </FormControl>

                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">{props.lang.passwordPlaceholder}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={85}
                            />
                        </FormControl>

                        {serverError && (
                            <Typography variant="body2" color="error" style={{ fontSize: 12 }}>
                                {serverError}
                            </Typography>
                        )}

                        <Typography variant="body2" color="primary" style={{ marginTop: theme.spacing(2) }}>
                            <Link href="/recupero-de-contrasena">{props.lang.forgotPassword}</Link>
                        </Typography>

                        <div className={classes.btnDiv}>
                            <Button
                                variant="contained"
                                size="large"
                                disabled={!isEmail || !isPassword || isSubmitting}
                                onClick={handleSubmit}
                            >
                                {props.lang.button}
                            </Button>
                        </div>
                    </form>
                </PaperWithTitleContainer>
            </div>
        </>
    );
};

LoginForm.propTypes = {
    lang: PropTypes.exact({
        title: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
        mailPlaceholder: PropTypes.string.isRequired,
        passwordPlaceholder: PropTypes.string.isRequired,
        forgotPassword: PropTypes.string.isRequired,
    }),
};

export default LoginForm;
