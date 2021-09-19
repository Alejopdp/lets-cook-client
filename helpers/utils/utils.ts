export const roundTwoDecimals = (number: number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const presentNumberWithHashtagAndDotSeparator = (number: number) => {
    return `#${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
