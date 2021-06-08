import axios from "axios";
import { USER_REQUEST_SETTINGS } from "../../hooks/useRequest/endpoints/user";

export default async function setPreviusData(req, res){
    const { token, clear } = req.query;

    if(!!clear) {
        res.clearPreviewData();
        res.status(200).json({ result: "success" });
        return
    }

    if( !!!token ) res.status(401).json({ result: "failed" });

    const _API_URL = process.env.NEXT_PUBLIC_API_URL + USER_REQUEST_SETTINGS.verifyTokenToken.endpoint;
    const response = await axios({
        method: USER_REQUEST_SETTINGS.verifyTokenToken.method,
        headers: {
            Authorization: token,
        },
        url: _API_URL,
    });

    console.log("***-> API Token verify: ", response.status);

    if(response.status !== 200) {
        res.status(401).json({ result: "failed" })
       return
    };

    res.setPreviewData({ token });
    res.status(200).json({ result: "success" });
};
