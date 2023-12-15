import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/SignUp";
import PatientPanel from "../pages/patient-panel/PatientPanel";
import AllDoctors from "../pages/all-doctors/AllDoctors";
import DoctorInfo from "../pages/doctor-info/DoctorInfo";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/patient-panel/:patient_id?' element={<PatientPanel />} />
                <Route path='/all-doctors' element={<AllDoctors />} />
                <Route path='/doctor-info/:doctor_id?' element={<DoctorInfo />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;