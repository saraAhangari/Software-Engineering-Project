import {API} from "./Api";

export async function getAllAppointments() {
    return await API.get('/appointments')
}

export async function postAppointment(
    doctorId,
    date,
    startTime,
    endTime,
) {
    return await API.post(
        '/appointments',
        {
            "doctor_id": doctorId,
            "appointment_time": {
                "date": date,
                "start": startTime,
                "end": endTime,
            }
        }
    )
}

export async function getAppointment(id) {
    return await API.get(`/appointments/${id}`)
}
