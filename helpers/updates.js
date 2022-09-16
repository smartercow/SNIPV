import axios from "axios";

const api = {
    baseUrl1: "https://snipv.vercel.app/api/updates",
}


export const getUpdates = () => {

    let response = axios.get(api.baseUrl1)
    .then(res => {
        console.log(response);
        return res.data
    })
    .catch(error => {
        console.log("FEJL", error)
    })

    return response
}