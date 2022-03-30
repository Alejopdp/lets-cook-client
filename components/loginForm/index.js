// Utils & config
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { login } from "../../helpers/serverRequests/user";
import { useRouter } from "next/router";
import { useUserInfoStore } from "../../stores/auth.tsx";
import { useStyles } from "./styles";
import cookies from "js-cookie";
import useRequest from "../../hooks/useRequest/useRequest";
import { emailRegex, pswRegex } from "../../helpers/regex";
import usePersistToken from "../../hooks/usePersistToken/usePersistToken";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "../../hooks/useLocalStorage/localStorage";
import { USER_REQUEST_SETTINGS } from "../../hooks/useRequest/endpoints/user";
const langs = require("../../lang").loginForm;

// External components
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Internal components
import Image from "next/image";
import Link from "next/link";
import Button from "../atoms/button/button";
import PaperWithTitleContainer from "../molecules/paperWithTitleContainer/paperWithTitleContainer";

const LoginForm = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const lang = langs[router.locale];
    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false,
    });
    const [serverError, setserverError] = useState(false);
    const [isSubmitting, setisSubmitting] = useState(false);
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);

    const { doRequest, isLoading, data, error } = useRequest();
    const { saveInLocalStorage } = useLocalStorage();
    const [persistToken] = usePersistToken();

    const isEmail = emailRegex.test(values.email);
    const isPassword = pswRegex.test(values.password);

    useEffect(() => {
        if (props.isLogged) {
            router.replace("/dashboard");
            return;
        }
    }, []);

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
        console.log("A VER LA RES: ", res);

        if (res.status === 200) {
            saveInLocalStorage("token", res.data.token);
            saveInLocalStorage("userInfo", res.data.userInfo);
            setUserInfo(res.data.userInfo);
            cookies.set("token", res.data.token);
            router.push("/dashboard");
        } else {
            setserverError(res.data.message);
            setisSubmitting(false);
        }
    };

    return (
        <>
            <Container>
                <Grid container spacing={4} style={{ height: "100vh", alignContent: "center" }}>
                    <Grid item xs={12} md={5} style={{ marginLeft: "auto", marginRight: "auto", paddingBottom: theme.spacing(10) }}>
                        <div style={{ textAlign: "center", marginBottom: theme.spacing(4) }}>
                            <Image src="/logo.png" width={164} height={56} />
                        </div>
                        <PaperWithTitleContainer title={lang.title} fullWidth>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <FormControl style={{ marginBottom: theme.spacing(2), width: "100%" }} variant="outlined">
                                    <TextField
                                        id="outlined-basic"
                                        label={lang.emailPlaceholder}
                                        variant="outlined"
                                        type="email"
                                        onChange={handleChange("email")}
                                    />
                                </FormControl>

                                <FormControl style={{ width: "100%" }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">{lang.passwordPlaceholder}</InputLabel>
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
                                    <Link href="/recupero-de-contrasena">{lang.forgotPassword}</Link>
                                </Typography>

                                <div className={classes.btnDiv}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        disabled={!isEmail || !isPassword || isSubmitting}
                                        onClick={handleSubmit}
                                    >
                                        {lang.button}
                                    </Button>
                                </div>
                            </form>
                        </PaperWithTitleContainer>
                    </Grid>
                </Grid>
            </Container>
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
