import {API} from "./Api";

export async function getAllDoctors() {
    return await API.get('/doctors')
}

export async function getDoctor(id) {
    return await API.get(`/doctors/${id}`)
}