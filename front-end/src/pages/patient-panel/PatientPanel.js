import React from "react";
import PatientPanelItem from "../../components/item/PatientPanelItem";
import {useParams} from "react-router-dom";
import ICON_CALENDAR from "../../assets/images/icon_calendar.svg";
import ICON_DOCUMENT from "../../assets/images/icon_docs.svg";
import ICON_EDIT_PENCIL from "../../assets/images/icon_edit_pencil.svg";
import ICON_MESSAGE from "../../assets/images/icon_message.svg";
import ICON_NOTES from "../../assets/images/icon_notes.svg";
import MainTemplate from "../../components/container/MainTemplate";
import SearchBar from "../../components/searchbar/SearchBar";

function PatientPanel(props) {
    const { patient_id } = useParams();

    const menuItems = [
        {
            icon: ICON_DOCUMENT,
            title: 'سوابق پزشکی',
            onClick: () => {
                // TODO: handle
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
                // TODO: handle
            },
        },
    ];

    function handleSearchInput(search) {
        // TODO: filter items
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
