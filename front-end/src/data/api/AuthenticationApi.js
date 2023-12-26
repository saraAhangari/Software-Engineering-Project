import {API} from "./Api";

export async function getToken(nationalId, otp) {
    return API.post(
        '/get_token',
        {
            "national_id": nationalId,
            "otp": otp,
        }
    ).then(r => {
        return r.data.access_token
    }).catch(error => {
        throw {otp: error.response.data.message};
    })
}

export async function validate(
    firstName,
    lastName,
    nationalId,
    phoneNumber,
    birthdate,
    assurance ,
    gender,
) {
    return API.post(
        '/validate',
        {
            first_name: firstName,
            last_name: lastName,
            national_id: nationalId,
            phone_no: phoneNumber,
            birthdate: birthdate,
            assurance: assurance,
            gender: gender,
        }
    ).catch(error => {
        throw error.response.data;
    })
}

export async function register(
    firstName,
    lastName,
    nationalId,
    phoneNumber,
    birthdate,
    assurance ,
    gender,
    otp,
) {
    return API.post(
        '/register',
        {
            first_name: firstName,
            last_name: lastName,
            national_id: nationalId,
            phone_no: phoneNumber,
            birthdate: birthdate,
            assurance: assurance,
            gender: gender,
            otp: otp,
            medical_history: {
                height: 0,
                weight: 0,
                blood_group: "A+",
                blood_pressure: 2147483647
            }
        }
    )
}

export async function login(nationalId) {
    return API.post(
        '/login',
        {
            "national_id": nationalId,
        }
    ).catch(error => {
        throw error.response.data
    })
}

export async function logout() {
    return API.post('logout')
}
