import React, {useEffect, useState} from "react";
import Doctor from "../../components/doctor/Doctor";
import SearchBar from "../../components/searchbar/SearchBar";
import MainTemplate from "../../components/container/MainTemplate";
import {useNavigate} from "react-router-dom";
import {getAllDoctors} from "../../data/api/DoctorApi";
import {safeApiCall} from "../../data/api/Api";
import Spinner from "../../components/animation/Spinner";

function AllDoctors(props) {

    const [doctors, setDoctors] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        safeApiCall(
            getAllDoctors(),
            setIsLoading,
            setErrors,
            setDoctors,
        )
    }, [])

    function handleSearchInput(search) {
        setSearchQuery(search);
    }

    const [searchQuery, setSearchQuery] = useState(undefined);
    useEffect(
        () => {
            console.log("searchQuery");
            console.log(searchQuery);
            if (searchQuery) {
                const filteredList = doctors.filter(doctor => {
                    doctor.name.includes(searchQuery)
                })
                setFilteredDoctors(filteredList);
            } else {
                setFilteredDoctors(doctors);
            }
        },
        [searchQuery, doctors],
    )

    window.onscroll = () => {
        if (!isLoading) {
            const documentElement = document.documentElement;
            const isScrollToBottom = documentElement.clientHeight + documentElement.scrollTop + 20 >= documentElement.scrollHeight;
            if (isScrollToBottom) {
                setIsLoading(true);
                // TODO: fetch more data, implement pagination
            }
        }
    };

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
                    filteredDoctors.map(
                        (doctor) => {
                            return <Doctor
                                id={doctor.id}
                                maxWidth={`${maxItemsWidth}px`}
                                name={doctor.name}
                                expertise={doctor.speciality}
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
                {
                    isLoading && <Spinner/>
                }
            </div>
        </MainTemplate>
    )
}

export default AllDoctors;