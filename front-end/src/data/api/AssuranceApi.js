import {API} from "./Api";

export async function getAllAssurances() {
    return await API.get('/assurance').then(r => {
        return r.data;
    })
}
