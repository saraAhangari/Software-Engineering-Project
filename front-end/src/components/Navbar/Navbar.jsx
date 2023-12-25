import "./NavbarStyle.css"
import ICON_HOME from "../../assets/images/icon_home.svg";
import ICON_LOGOUT from "../../assets/images/icon_logout.svg";
import ICON_PROFILE from "../../assets/images/icon_profile_circled.svg"


function Navbar() {
    return (
        <div className="NavbarContainer">

            <div className="Navbar-Left">
                <img className="NavbarIcon" src={ICON_HOME} alt="" />
            </div>
            <div className="Navbar-Left">
                <img className="NavbarIcon" src={ICON_PROFILE} alt="" />
                <div className="navbar-left-seprator"></div>
                <img className="NavbarIcon" src={ICON_LOGOUT} alt="" />
            </div>
        </div>
    )
}

export default Navbar;