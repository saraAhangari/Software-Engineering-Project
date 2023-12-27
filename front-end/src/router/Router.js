import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/SignUp";
import PatientPanel from "../pages/patient-panel/PatientPanel";
import AllDoctors from "../pages/all-doctors/AllDoctors";
import DoctorInfo from "../pages/doctor-info/DoctorInfo";
import MyComments from "../pages/my-comments/MyComments";
import EditInformation from "../pages/EditInformation";
import Profile from "../pages/Profile/Profile";
import VisitHistory from "../pages/VisitHistory/VisitHistory";
import Prescription from "../pages/Prescription/prescription";

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
                <Route path='/my-comments' element={<MyComments />} />
                <Route path='/edit-information' element={<EditInformation />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/history' element={<VisitHistory />} />
                <Route path='/prescription' element={<Prescription />} />                
            </Routes>
        </BrowserRouter>
    )
}

export default Router;