import axios from "axios";

const api = {
    url: "https://valorant-api.com/v1/agents"
}

export const getUpdates = () => {

    let response = axios.get(api.url).then(res => {
        console.log('Data modtaget');
        return res.data
    })
    .catch(error => {
        console.log("FEJL", error);
        return null
    })

    return response;
}