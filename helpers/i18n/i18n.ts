import { PlanFrequencyValue } from "helpers/types/frequency";

export const translateFrequency = (planFrequencyValue: string, locale: string = "es"): string => {
    switch (planFrequencyValue) {
        case PlanFrequencyValue.ONE_TIME:
            return one_time[locale];
        case PlanFrequencyValue.WEEKLY:
            return weekly[locale];
        case PlanFrequencyValue.BIWEEKLY:
            return biweekly[locale];
        case PlanFrequencyValue.MONTHLY:
            return monthly[locale];
        default:
            return "Wrong value";
    }
};

export const translateShippíngHour = (value: string, locale: string = "es") => {
    const shippingHourMap = {
        "15 - 18": { es: "de 15 a 18 hs", ca: "de 15 a 18 hs", en: "3 to 6 pm" },
        "17 - 20": { es: "de 17 a 20 hs", ca: "de 17 a 20 hs", en: "5 to 8 pm" },
        "19 - 22": { es: "de 19 a 22 hs", ca: "de 19 a 22 hs", en: "7 to 10 pm" },
    };

    return shippingHourMap[value] ? shippingHourMap[value][locale] : value;
};

const one_time = {
    es: "Por única vez",
    en: "One time",
    ca: "Por única vez",
};

const weekly = {
    es: "Semanal",
    en: "Every week",
    ca: "Semanal",
};

const biweekly = {
    es: "Quincenal",
    en: "Biweekly",
    ca: "Quincenal",
};

const monthly = {
    es: "Mensual",
    en: "Monthly",
    ca: "Mensual",
};
