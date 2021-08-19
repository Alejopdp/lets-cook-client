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
