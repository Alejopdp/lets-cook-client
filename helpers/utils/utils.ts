export const roundTwoDecimals = (number: number) => {
    return Math.round(number * 100) / 100;
};

export const presentNumberWithHashtagAndDotSeparator = (number: number) => {
    return `#${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export const numberCompactFormatter = (num: number) => {
    let formatter = new Intl.NumberFormat("en", {
        notation: "compact",
    });

    return formatter.format(num);
};
