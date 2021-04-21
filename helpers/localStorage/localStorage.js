export const getToken = () => {
    return window.localStorage.getItem("token")
}

export const setItemInLocalStorage = (itemName, itemValue) => {
    return window.localStorage.setItem(itemName, JSON.stringify(itemValue))
}