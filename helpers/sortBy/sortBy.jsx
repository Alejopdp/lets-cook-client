export const useSortBy = () => {
    /**
     * @param sortBy: enum values [ASC] or [DESC]
     */
    return ({ array = [], objKey = "", sortBy = "ASC" }) => {
        return array.sort((a, b) => {
            const countable = a[objKey] instanceof Date || typeof a[objKey] === "number";

            if (countable) {
                return sortBy === "DESC" ? b[objKey] - a[objKey] : a[objKey] - b[objKey];
            }

            if (typeof a[objKey] === "string") {
                if (a[objKey] > b[objKey]) {
                    return sortBy === "DESC" ? -1 : 1;
                } else if (a[objKey] < b[objKey]) {
                    return sortBy === "DESC" ? 1 : -1;
                } else {
                    return 0;
                }
            }
            throw "Sort by this object type not yet implemented.";
        });
    };
};
