// Utils & config
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// External components
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
// Icons & Images
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// Internal components
import { emailRegex, pswRegex } from "../../helpers/regex";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "../../hooks/useLocalStorage/localStorage";
import usePersistToken from "../../hooks/usePersistToken/usePersistToken";
import { USER_REQUEST_SETTINGS } from "../../hooks/useRequest/endpoints/user";
import useRequest from "../../hooks/useRequest/useRequest";
import Button from "../atoms/button/button";
import PaperWithTitleContainer from "../molecules/paperWithTitleContainer/paperWithTitleContainer";





const useStyles = makeStyles((theme) => ({
    image: {
        padding: theme.spacing(2),
    },
    center: {
        display: "flex",
        placeItems: "center",
        minHeight: "75vh",
    },

    form: {
        display: "flex",
        flexDirection: "column",
    },
    btnDiv: {
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        marginTop: theme.spacing(3),
    },
    margin: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    textField: {
        width: "100%",
    },
}));

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

    const { doRequest, isLoading, data, error } = useRequest();
    const { saveInLocalStorage } = useLocalStorage();
    const [persistToken] = usePersistToken();

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
        const { email, password } = values;
        doRequest({
            endpointSetting: USER_REQUEST_SETTINGS.login,
            body: {
                email,
                password,
            },
        });
    };

    useEffect(() => {
        if (props.isLogged) {
            router.replace("/dashboard");
            return;
        }

        if (!!!isLoading && !!!error && data) {
            const { token, userInfo } = data;
            saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, userInfo);
            saveInLocalStorage(LOCAL_STORAGE_KEYS.token, token);
            persistToken(token);
            router.replace("/dashboard");
            return;
        }

        if (error) {
            console.log("***-> Response has Error: ", error);
            setserverError(error.message);
        }

        // Todo: Use isLoading var for spinner indicator
        // and bloquing controls

        console.log("***-> Is request in course: ", isLoading);
    }, [isLoading, data, error]);

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
                            <Button variant="contained" size="large" disabled={!isEmail || !isPassword || isLoading} onClick={handleSubmit}>
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
