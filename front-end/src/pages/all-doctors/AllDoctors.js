import React, {useState} from "react";
import Doctor from "../../components/doctor/Doctor";
import SearchBar from "../../components/searchbar/SearchBar";
import MainTemplate from "../../components/container/MainTemplate";

function AllDoctors(props) {
    const [doctors, setDoctors] = useState([]);

    for (let i = 0; i < 30; i++) {
        doctors.push(
            {
                id: '',
                name: 'دکتر محمد محمدی',
                expertise: 'متخصص جراحی استخوان و مفاصل',
            }
        )
    }

    function handleSearchInput(search) {
        // TODO: handle search input
    }

    function handleOnDoctorClicked(id) {
        // TODO: navigate to doctor details page
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