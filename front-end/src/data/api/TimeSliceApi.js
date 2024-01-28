import {API} from "./Api";

export async function getTimeSlicesOfDoctor(doctorId, date) {
    if (!date) {
        const now = new Date();
        date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    }

    return await API.get(`/timeslices/${doctorId}`, {
        params: {
            date: date
        }
    }).then(r => {
        console.log(date, 'requested');
        console.log(r.data["available_time_slices"], 'returned')
        return r.data["available_time_slices"];
    }).catch(error => {
        console.log(error);
        console.log('mazid');
    })
}