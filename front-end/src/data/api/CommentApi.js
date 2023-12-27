import {API} from "./Api";

export async function getDoctorComments(doctorId) {
    console.log(API.defaults.headers);

    return await API.get(`/comment/${doctorId}`).then(r => {
        return r.data;
    })
}