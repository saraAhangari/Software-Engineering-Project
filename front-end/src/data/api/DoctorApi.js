import {API} from "./Api";

export async function getAllDoctors() {
    return await API.get('/doctors').then(r => {
        return r.data.map(mapDoctorResult);
    })
}

export async function getDoctor(id) {
    return await API.get(`/doctors/${id}`)
}

function mapDoctorResult(doctor) {
    return {
        id: doctor.id,
        description: doctor.description,
        speciality: getDoctorSpeciality(doctor.speciality),
        name: `دکتر ${doctor.first_name} ${doctor.last_name}`,
    }
}

function getDoctorSpeciality(speciality) {
    return speciality.map(item => {
        return item.name
    }).join(', ')
}