import React, {useEffect, useState} from "react";
import Doctor from "../../components/doctor/Doctor";
import SearchBar from "../../components/searchbar/SearchBar";
import MainTemplate from "../../components/container/MainTemplate";
import {useNavigate} from "react-router-dom";

function AllDoctors(props) {
    const doctors = [
        {
            id: '1',
            name: 'دکتر محمد محمدی',
            expertise: 'متخصص جراحی استخوان و مفاصل',
        },
        {
            id: '2',
            name: 'دکتر محمد محمدی',
            expertise: 'متخصص جراحی استخوان و مفاصل',
        },
        {
            id: '3',
            name: 'دکتر محمد محمدی',
            expertise: 'متخصص جراحی استخوان و مفاصل',
        },
        {
            id: '4',
            name: 'دکتر محمد محمدی',
            expertise: 'متخصص جراحی استخوان و مفاصل',
        },
        {
            id: '5',
            name: 'دکتر محمد محمدی',
            expertise: 'متخصص جراحی استخوان و مفاصل',
        },
        {
            id: '6',
            name: 'دکتر محمد محمدی',
            expertise: 'متخصص جراحی استخوان و مفاصل',
        },
        {
            id: '7',
            name: 'دکتر محمد محمدی',
            expertise: 'متخصص جراحی استخوان و مفاصل',
        },
        {
            id: '8',
            name: 'دکتر محمد محمدی',
            expertise: 'متخصص جراحی استخوان و مفاصل',
        },
    ]

    function handleSearchInput(search) {
        // TODO: handle search input
    }

    const navigate = useNavigate();

    function handleOnDoctorClicked(id) {
        navigate(`/doctor-info/${id}`)
    }

    const maxItemsWidth = 600;

    return (
        <MainTemplate>
            <div
                style={
                    {
                        width: '100%',
                        rowGap: '15px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: '40px 20px',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }
                }
            >
                <SearchBar
                    placeholder={'جستجوی پزشک'}
                    onTextChanged={handleSearchInput}
                />
                {
                    doctors.map(
                        (doctor) => {
                            return <Doctor
                                id={doctor.id}
                                maxWidth={`${maxItemsWidth}px`}
                                name={doctor.name}
                                expertise={doctor.expertise}
                                buttonTitle={'دریافت نوبت'}
                                onItemClicked={
                                    () => {
                                        handleOnDoctorClicked(doctor.id)
                                    }
                                }
                            />
                        }
                    )
                }
            </div>
        </MainTemplate>
    )
}

export default AllDoctors;