import axios from "axios";
import { USER_REQUEST_SETTINGS } from "../../hooks/useRequest/endpoints/user";

export default async function authToken(previewData) {
    console.log("***-> Session PreviewData: ", previewData);
    let _token = "";
    if (!!previewData) {
        const { token } = previewData;
        const _API_URL = process.env.NEXT_PUBLIC_API_URL + USER_REQUEST_SETTINGS.verifyTokenToken.endpoint;

        if (!!token) {
            _token = token;

            const res = await axios({
                method: USER_REQUEST_SETTINGS.verifyTokenToken.method,
                headers: {
                    Authorization: token,
                },
                url: _API_URL,
            });

            console.log("***-> Token verify: ", res.status);

            if (res.status !== 200) {
                _token = "";
                await fetch(`api/preview?clear=true`);
            }
        }
    }
    return _token;
};
