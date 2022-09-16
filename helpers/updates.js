import axios from "axios";

const api = {
    baseUrl1: "https://api.dataforsyningen.dk/",
}


export const getUpdates = () => {

    let response = axios.get(api.baseUrl1)
    .then(res => {
        console.log(response);
        return res.data
    })
    .catch(error => {
        console.log("FEJL", error)
        //return null
        throw new Error("Desværre - ingen by/postnummer")
    })

    return response
}