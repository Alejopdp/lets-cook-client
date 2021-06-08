import { Box, Checkbox, FormControlLabel, Grid, InputAdornment, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { COUPONS_REQUEST_SETTINGS } from "../../../hooks/useRequest/endpoints/coupons";
import useRequest from "../../../hooks/useRequest/useRequest";
import CheckboxList from "../../atoms/checkboxList/checkboxList";
import DatePicker from "../../atoms/datepicker/datepicker";
import Input from "../../atoms/input/input";
import RadioButtons from "../../atoms/radioButtons/radioButtons";
import SimpleSelect from "../../atoms/simpleSelect/SimpleSelect";
import HeaderTitleWithBackButton from "../../layout/dashboardTitleWithBackButton";
import FormActionsButtons from "../../molecules/backAndCreateButtons/backAndCreateButtons";
import CardContainerWithTitle from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import ParagraphWithSimpleInput from "../../molecules/paragraphWithSimpleInput/paragraphWithSimpleInput";
import SimpleTileList from "../../molecules/simpleTileList/simpleTileList";
import { useStyles } from "./styles";
import useCouponsForm from "./useCouponsForm";

const CouponsForm = ({
    lang,
    applyToProducts = [
        {
            id:"de54247f-5438-4b82-b050-203a47f59688",
            name: "Plan Vegetariano",
            type: "Principal",
        },
        {
            id:"de54247f-5438-4b82-b050-203a47f59689",
            name: "Plan Ahorro",
            type: "Principal",
        },
        {
            id:"de54247f-5438-4b82-b050-203a47f59680",
            name: "Plan Desayuno",
            type: "Adicional",
        },
    ],
    frominitialState = {
        discount_code: "",
        discount_type: {
            type: "fix",
            value: "",
        },
        minimum_requirement: {
            type: "none",
            value: "",
        },
        apply_to: {
            type: "all",
            value: [],
        },
        application_limit: [],
        coupons_by_subscription: {
            type: "only_fee",
            value: "",
        },
        date_rage: {
            start: new Date().toISOString(),
            expire: "",
        },
        state: "active",
    },
}) => {
    const { locale, back: _handleGoBack } = useRouter();
    const classes = useStyles();
    const { handleOnChange, form } = useCouponsForm(frominitialState);
    const [showExpireDate, setShowExpireDate] = useState(false);
    const { data, error, isLoading, doRequest } = useRequest();

    const _formConstantsValues = {
        discount_type: ["fix", "percent", "free"],
        minimum_requirement: ["none", "amount"],
        apply_to: ["all", "specific"],
        application_limit: ["limit_qty", "limit_one_customer", "first_order"],
        coupons_by_subscription: ["only_fee", "more_one_fee", "all_fee"],
    };

    const _minimumRequirementItems = [
        {
            label: lang[locale].minimum_requirement_type[0],
            value: _formConstantsValues.minimum_requirement[0],
        },
        {
            label: lang[locale].minimum_requirement_type[1],
            value: _formConstantsValues.minimum_requirement[1],
        },
    ];

    const _applyToItems = [
        {
            label: lang[locale].apply_to_type[0],
            value: _formConstantsValues.apply_to[0],
        },
        {
            label: lang[locale].apply_to_type[1],
            value: _formConstantsValues.apply_to[1],
        },
    ];

    const _handleOnChangeApplicationLimitList = ({ name: fieldName, item: itemField, checked: isAdd }) => {
        let fieldValue = [];
        if (isAdd) {
            fieldValue = [
                ...form.application_limit,
                {
                    type: itemField.name,
                    value: "",
                },
            ];
        } else {
            fieldValue = form.application_limit.filter((item) => item.type !== itemField.name);
        }
        handleOnChange({
            target: {
                name: fieldName,
                value: fieldValue,
            },
        });
    };

    const _handleOnChangeApplicationLimitInput = ({ target: input }) => {
        const fieldValue = form.application_limit.map((item) => {
            if (item.type === input.name) {
                return {
                    type: item.type,
                    value: input.value,
                };
            }
            return item;
        });

        handleOnChange({
            target: {
                name: "application_limit",
                value: fieldValue,
            },
        });
    };

    const _applicationLimitItems = [
        {
            label: lang[locale].application_limit[0],
            name: _formConstantsValues.application_limit[0],
            value: form.application_limit[0],
            children: ParagraphWithSimpleInput({
                paragraph: lang[locale].limit_qty,
                inputLabel: lang[locale].amount,
                inputType: "number",
                inputRightText: lang[locale].uses,
                inputName: _formConstantsValues.application_limit[0],
                handleOnChage: _handleOnChangeApplicationLimitInput,
            }),
        },
        {
            label: lang[locale].application_limit[1],
            name: _formConstantsValues.application_limit[1],
        },
        {
            label: lang[locale].application_limit[2],
            name: _formConstantsValues.application_limit[2],
        },
    ];

    const _couponsBySubscriptionItems = [
        {
            label: lang[locale].coupons_by_subscription[0],
            subtitle: lang[locale].coupons_by_subscription_subtitle[0],
            value: _formConstantsValues.coupons_by_subscription[0],
        },
        {
            label: lang[locale].coupons_by_subscription[1],
            subtitle: lang[locale].coupons_by_subscription_subtitle[1],
            value: _formConstantsValues.coupons_by_subscription[1],
            children: ParagraphWithSimpleInput({
                inputType: "number",
                paragraph: lang[locale].more_one_fee,
                inputLabel: lang[locale].amount,
                inputRightText: lang[locale].charges,
                inputName: "coupons_by_subscription|value",
                handleOnChage: (e) => {
                    handleOnChange(e);
                },
            }),
        },
        {
            label: lang[locale].coupons_by_subscription[2],
            subtitle: lang[locale].coupons_by_subscription_subtitle[2],
            value: _formConstantsValues.coupons_by_subscription[2],
        },
    ];

    const _handleClickCreateButton = () => {
        // TODO: Put here all code for send form values and validations.
        console.log("Form values: ", form);
        doRequest({
            endpointSetting: COUPONS_REQUEST_SETTINGS.create,
            body: JSON.stringify(form)
        })
    };

    useEffect(() => {
        if (form.discount_type.type === _formConstantsValues.discount_type[2] && !!form.discount_type.value) {
            handleOnChange({
                target: {
                    name: "discount_type|value",
                    value: "",
                },
            });
        }
        if (form.minimum_requirement.type === _formConstantsValues.minimum_requirement[0] && !!form.minimum_requirement.value) {
            handleOnChange({
                target: {
                    name: "minimum_requirement|value",
                    value: "",
                },
            });
        }
        if (form.apply_to.type === _formConstantsValues.apply_to[0] && !!form.apply_to.value.length) {
            handleOnChange({
                target: {
                    name: "apply_to|value",
                    value: [],
                },
            });
        }
        if (form.coupons_by_subscription.type !== _formConstantsValues.coupons_by_subscription[1] && !!form.coupons_by_subscription.value) {
            handleOnChange({
                target: {
                    name: "coupons_by_subscription|value",
                    value: "",
                },
            });
        }

        //TODO: DEBUG: DELETE AFTER IMPLEMENTATION
        console.log( '***-> DATA: ',data, "***-> ERROR: ", error)
    }, [form.discount_type, form.minimum_requirement, form.apply_to, form.coupons_by_subscription, data, error]);

    const renderMinimumRequirementInput = () => (
        <div style={{ paddingTop: 16 }}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Input
                        label={lang[locale].value}
                        name="minimum_requirement|value"
                        type="number"
                        value={form.minimum_requirement.value}
                        customProps={{
                            InputProps: {
                                endAdornment: <InputAdornment position="end">EUR</InputAdornment>,
                            },
                        }}
                        handleChange={handleOnChange}
                    />
                </Grid>
            </Grid>
            <Alert severity="info" color="success">
                {lang[locale].minimumRequirementMessage}
            </Alert>
        </div>
    );

    const renderDiscountTypeInput = () => (
        <Grid item xs={4}>
            <Input
                label={lang[locale].value}
                name="discount_type|value"
                value={form.discount_type.value}
                handleChange={handleOnChange}
                type="number"
                customProps={{
                    InputProps: {
                        endAdornment: (
                            <InputAdornment position="end">
                                {form.discount_type.type === _formConstantsValues.discount_type[0] ? "€" : "%"}
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Grid>
    );

    const renderSpecificProductToApplyCoupon = () => (
        <SimpleTileList
            useBold={true}
            listItemsSelected={form.apply_to.value}
            list={applyToProducts}
            buttonAddTitle={lang[locale].buttonAddTitle}
            handleChangeList={(items) => {
                handleOnChange({
                    target: {
                        name: "apply_to|value",
                        value: [...items],
                    },
                });
            }}
            handleRemoveItem={(item) => {
                console.log(item)
                handleOnChange({
                    target: {
                        name: "apply_to|value",
                        value: form.apply_to.value.filter((id) => id !== item.id),
                    },
                });
            }}
        />
    );

    return (
        <Grid item xs={12}>
            <form className={classes.rootForm}>
                <Grid container spacing={2} direction="row" justify="center">
                    <Grid item xs={12} md={9}>
                        <Box display="flex" alignItems="center">
                            <HeaderTitleWithBackButton title={lang[locale].title} handleClick={_handleGoBack} />
                        </Box>
                    </Grid>

                    {/* DISCOUNT CODE */}

                    <Grid item xs={12} md={9}>
                        <CardContainerWithTitle fullWidth={true} title={lang[locale].discountCode}>
                            <Input
                                label={lang[locale].discountCode}
                                name="discount_code"
                                value={form.discountCode}
                                handleChange={handleOnChange}
                            />
                        </CardContainerWithTitle>
                    </Grid>

                    {/* DISCOUNT TYPE */}

                    <Grid item xs={12} md={9}>
                        <CardContainerWithTitle fullWidth={true} title={lang[locale].discountType}>
                            <Grid container spacing={2} justify="center">
                                <Grid item xs>
                                    <SimpleSelect
                                        name="discount_type|type"
                                        items={lang[locale].discount_type}
                                        values={_formConstantsValues.discount_type}
                                        value={form.discount_type.type}
                                        handleChange={handleOnChange}
                                    />
                                </Grid>
                                {form.discount_type.type !== _formConstantsValues.discount_type[2] && renderDiscountTypeInput()}
                            </Grid>
                        </CardContainerWithTitle>
                    </Grid>

                    {/* MINIMUM REQUIREMENT */}

                    <Grid item xs={12} md={9}>
                        <CardContainerWithTitle fullWidth title={lang[locale].minimumRequirement}>
                            <Grid container spacing={2}>
                                <Grid item xs>
                                    <RadioButtons
                                        name="minimum_requirement|type"
                                        items={_minimumRequirementItems}
                                        value={form.minimum_requirement.type}
                                        handleOnChange={handleOnChange}
                                    />
                                    {form.minimum_requirement.type === _formConstantsValues.minimum_requirement[1] &&
                                        renderMinimumRequirementInput()}
                                </Grid>
                            </Grid>
                        </CardContainerWithTitle>
                    </Grid>

                    {/* APPLY TO */}

                    <Grid item xs={12} md={9}>
                        <CardContainerWithTitle fullWidth title={lang[locale].applyTo}>
                            <Grid container spacing={2} direction="column">
                                <Grid item xs>
                                    <RadioButtons
                                        name="apply_to|type"
                                        items={_applyToItems}
                                        value={form.apply_to.type}
                                        handleOnChange={handleOnChange}
                                    />
                                    {form.apply_to.type === _formConstantsValues.apply_to[1] && renderSpecificProductToApplyCoupon()}
                                </Grid>
                            </Grid>
                        </CardContainerWithTitle>
                    </Grid>

                    {/* APPLICATION LIMIT */}

                    <Grid item xs={12} md={9}>
                        <CardContainerWithTitle fullWidth title={lang[locale].applicationLimit}>
                            <Grid container spacing={1} direction="column">
                                <Grid item xs>
                                    <CheckboxList
                                        name="application_limit"
                                        handleOnChange={_handleOnChangeApplicationLimitList}
                                        items={_applicationLimitItems}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Typography>{lang[locale].applicationLimitSecondPart}</Typography>
                                </Grid>
                                <Grid item xs>
                                    <RadioButtons
                                        useBold={true}
                                        name="coupons_by_subscription|type"
                                        value={form.coupons_by_subscription.type}
                                        items={_couponsBySubscriptionItems}
                                        handleOnChange={handleOnChange}
                                    />
                                </Grid>
                            </Grid>
                        </CardContainerWithTitle>
                    </Grid>

                    {/* DATE RANGE */}

                    <Grid item xs={12} md={9}>
                        <CardContainerWithTitle fullWidth title={lang[locale].dateRage}>
                            <Grid container spacing={2} direction="column">
                                <Grid item xs>
                                    <DatePicker
                                        handleDateChange={(startDate) => {
                                            handleOnChange({
                                                target: {
                                                    name: "date_rage|start",
                                                    value: startDate.toISOString(),
                                                },
                                            });
                                        }}
                                        dateSelected={form.date_rage.start}
                                        label={lang[locale].dateStart}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormControlLabel
                                        control={<Checkbox name="hasExpirateDate" color="primary" />}
                                        label={lang[locale].setExpireDate}
                                        onChange={(e) => {
                                            setShowExpireDate(e.target.checked);
                                            const value = e.target.checked ? new Date().toISOString() : "";
                                            handleOnChange({
                                                target: {
                                                    name: "date_rage|expire",
                                                    value,
                                                },
                                            });
                                        }}
                                    />
                                </Grid>
                                {showExpireDate && (
                                    <Grid item xs>
                                        <DatePicker
                                            dateSelected={form.date_rage.expire}
                                            handleDateChange={(startDate) => {
                                                handleOnChange({
                                                    target: {
                                                        name: "date_rage|expire",
                                                        value: startDate.toISOString(),
                                                    },
                                                });
                                            }}
                                            label={lang[locale].dateExpire}
                                        ></DatePicker>
                                    </Grid>
                                )}
                            </Grid>
                        </CardContainerWithTitle>
                    </Grid>

                    {/* ACTIONS BUTTONS */}

                    <Grid item xs={12} md={9}>
                        <Grid container justify="flex-end">
                            <FormActionsButtons
                                createButtonHandler={_handleClickCreateButton}
                                backButtonHandler={_handleGoBack}
                                createButtonText={lang[locale].buutonSubmitTtle}
                                variant="outline"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

CouponsForm.propTypes = {};

CouponsForm.defaultValues = {};

export default CouponsForm;
