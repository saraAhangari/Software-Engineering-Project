import React from "react";
import PatientPanelItem from "../../components/item/PatientPanelItem";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import ICON_CALENDAR from "../../assets/images/icon_calendar.svg";
import ICON_DOCUMENT from "../../assets/images/icon_docs.svg";
import ICON_EDIT_PENCIL from "../../assets/images/icon_edit_pencil.svg";
import ICON_MESSAGE from "../../assets/images/icon_message.svg";
import ICON_NOTES from "../../assets/images/icon_notes.svg";
import MainTemplate from "../../components/container/MainTemplate";
import SearchBar from "../../components/searchbar/SearchBar";
import { useAuth } from "../../auth/Auth";
import PrimaryButton from "../../components/button/PrimaryButton";

function PatientPanel(props) {
    const { token } = useAuth();
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to={'/login'} />
    }

    const menuItems = [
        {
            icon: ICON_DOCUMENT,
            title: 'سوابق پزشکی',
            onClick: () => {
                navigate('/profile')
            },
        },
        {
            icon: ICON_CALENDAR,
            title: 'نوبت ها',
            onClick: () => {
                // TODO: handle
            },
        },
        {
            icon: ICON_NOTES,
            title: 'نسخه ها',
            onClick: () => {
                // TODO: handle
            },
        },
        {
            icon: ICON_MESSAGE,
            title: 'نظرات من',
            onClick: () => {
                // TODO: handle
            },
        },
        {
            icon: ICON_EDIT_PENCIL,
            title: 'ویرایش اطلاعات',
            onClick: () => {
                navigate('/edit-information')
            },
        },
    ];

    function handleSearchInput(search) {
        // TODO: filter items
    }

    const navigateToAllDoctorsPage = () => {
        navigate('/all-doctors');
    }

    return (
        <MainTemplate
            hasLoggedIn={true}
            showDefaultBackground={false}
        >
            <div className={'patient-panel'}>
                <SearchBar
                    placeholder={'جستجوی پزشک'}
                    onTextChanged={handleSearchInput}
                    endChild={
                        <PrimaryButton
                            text={'همه پزشکان'}
                            onButtonClicked={navigateToAllDoctorsPage}
                        />
                    }
                />
                {
                    menuItems.map(
                        (item) => {
                            return <PatientPanelItem
                                icon={item.icon}
                                title={item.title}
                                iconAlt={item.title}
                                onClick={item.onClick}
                            />
                        }
                    )
                }
            </div>
        </MainTemplate>
    )
}

export default PatientPanel;
