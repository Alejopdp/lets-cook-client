import Axios from "axios"


export const login = async (email, password) => {
    
    try {
        const res = await Axios({
            method: "GET",
            url: "localhost:3001/api/v1/user/login",
            data: {email, password}
        })

        return res;
    } catch (error) {
        return error.response
    }
    
}