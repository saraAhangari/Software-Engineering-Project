import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/SignUp";
import PatientPanel from "../pages/patient-panel/PatientPanel";
import AllDoctors from "../pages/all-doctors/AllDoctors";
import DoctorInfo from "../pages/doctor-info/DoctorInfo";
import DoctorPanel from "../pages/doctor-panel/doctorPanel";
import MyComments from "../pages/my-comments/MyComments";
import DoctorComments from "../pages/doctorComment/DoctorComments";
import EditInformation from "../pages/EditInformation";
import Profile from "../pages/Profile/Profile";
import VisitHistory from "../pages/VisitHistory/VisitHistory";
import Prescription from "../pages/Prescription/prescription";
import DoctorsPatients from "../pages/doctorsPatient/DoctorsPatients";
import DoctorInformation from "../pages/doctorInformation/DoctorInformation";
import WorkTime from "../pages/workTime/WorkTime";
import DoctorPrescription from '../pages/doctor-prescription/doctor-prescription';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/doctor-prescription' element={<DoctorPrescription />} />
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/patient-panel' element={<PatientPanel />} />
                <Route path='/all-doctors' element={<AllDoctors />} />
                <Route path='/doctor-info/:doctor_id?' element={<DoctorInfo />} />
                <Route path='/doctor-panel' element={<DoctorPanel />} />
                <Route path='/doctor-patients' element={<DoctorsPatients />} />
                <Route path='/patient-panel/my-comments' element={<MyComments />} />
                <Route path='/edit-information' element={<EditInformation />} />
                <Route path='/doctor-information' element={<DoctorInformation />} />
                <Route path='/doctor-comments' element={<DoctorComments />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/history' element={<VisitHistory />} />
                <Route path='/prescription' element={<Prescription />} />
                <Route path='/work-time' element={<WorkTime />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
