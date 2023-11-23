import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;