
export interface OtherAddressInformation { city: string, province: string, country: string, postalCode: string }

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

export const numberMoneyFormatter = (num: number) => {
    let formatter = new Intl.NumberFormat("en-EN", {
        // notation: "compact",
        style: "currency",
        currency: "EUR",
        useGrouping: true,
    });

    return formatter.format(num);
};

export const getYyyyMmDd = (inputDate?: Date | string): string | undefined => {
    if (!inputDate) return undefined
    const forcedDate = new Date(inputDate)
    let date, month, year;

    date = forcedDate.getDate();
    month = forcedDate.getMonth() + 1;
    year = forcedDate.getFullYear();

    date = date
        .toString()
        .padStart(2, '0');

    month = month
        .toString()
        .padStart(2, '0');

    return `${year}-${month}-${date}`;
}

export const getFormattedAddressFromGoogle = (address_components?: { long_name: string, short_name: string, types: string[] }[]): OtherAddressInformation => {
    if (!address_components) return {
        city: '',
        province: '',
        country: '',
        postalCode: ''

    }
    return {
        city: address_components.find(component => component.types.includes("locality"))?.long_name ?? "",
        country: address_components.find(component => component.types.includes("country"))?.long_name ?? "",
        province: address_components.find(component => component.types.includes("administrative_area_level_1"))?.long_name ?? "",
        postalCode: address_components.find(component => component.types.includes("postal_code"))?.long_name ?? ""
    }


}