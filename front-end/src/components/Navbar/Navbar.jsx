import "./NavbarStyle.css"
import ICON_HOME from "../../assets/images/icon_home.svg";
import ICON_LOGOUT from "../../assets/images/icon_logout.svg";
import ICON_PROFILE from "../../assets/images/icon_profile_circled.svg"
import { Navigate, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../../auth/Auth";


function Navbar() {
    const navigate = useNavigate();
    const { token, logoutUser } = useAuth();
    return (
        <div className="NavbarContainer">
            <div onClick={() => navigate("/")} className="Navbar-Left">
                <img className="NavbarIcon" src={ICON_HOME} alt="" />
            </div>
            <div onClick={() => navigate("/")} className="Navbar-Left">
                <img className="NavbarIcon" src={ICON_PROFILE} alt="" />
                <div onClick={() => { logoutUser(); navigate("/"); }} className="navbar-left-seprator"></div>
                <img className="NavbarIcon" src={ICON_LOGOUT} alt="" />
            </div>
        </div>
    )
}

export default Navbar;