import {API} from "./Api";

export async function getAllDoctors() {
    return await API.get('/doctors').then(r => {
        return r.data.map(mapDoctorResult);
    })
}

export async function getDoctor(id) {
    return await API.get(`/doctors/${id}`).then(r => {
        const doctor = r.data;
        return {
            id: doctor.id,
            biography: doctor.description,
            name: extractDoctorFullName(doctor),
            speciality: getDoctorSpeciality(doctor.speciality),
        }
    })
}

function extractDoctorFullName(doctor) {
    return `دکتر ${doctor.first_name} ${doctor.last_name}`;
}

function mapDoctorResult(doctor) {
    return {
        id: doctor.id,
        description: doctor.description,
        speciality: getDoctorSpeciality(doctor.speciality),
        name: extractDoctorFullName(doctor),
    }
}

function getDoctorSpeciality(speciality) {
    return speciality.map(item => {
        return item.name
    }).join(', ')
}