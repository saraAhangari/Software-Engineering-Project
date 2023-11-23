import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import SignUp from "../pages/authentication/SignUp";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;