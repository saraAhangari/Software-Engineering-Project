import "./NavbarStyle.css"
import ICON_HOME from "../../assets/images/icon_home.svg";
import ICON_LOGOUT from "../../assets/images/icon_logout.svg";
import ICON_PROFILE from "../../assets/images/icon_profile_circled.svg"
import { useNavigate } from "react-router-dom";


function Navbar() {
    const navigation = useNavigate()
    function navigateToHome() {
        navigation('/')
    }
    function navigateToProfile() {
        navigation('/patient-panel')
    }
    function logout() {
        // TODO: logout
    }
    return (
        <div className="NavbarContainer">

            <div className="Navbar-Left">
                <img className="NavbarIcon" src={ICON_HOME} alt="" onClick={navigateToHome} />
            </div>
            <div className="Navbar-Left">
                <img className="NavbarIcon" src={ICON_PROFILE} alt="" onClick={navigateToProfile} />
                <div className="navbar-left-seprator"></div>
                <img className="NavbarIcon" src={ICON_LOGOUT} alt="" onClick={logout} />
            </div>
        </div>
    )
}

export default Navbar;
