import React from "react";
import {useNavigate} from 'react-router-dom';
import MainTemplate from "../../components/container/MainTemplate";
import SearchBar from "../../components/searchbar/SearchBar";
import PrimaryButton from "../../components/button/PrimaryButton";

function Home() {
    const navigate = useNavigate();

    const navigateToAllDoctorsPage = () => {
        navigate('/all-doctors');
    }

    return (
        <MainTemplate>
            <div className={'home-page'}>
                <h1>نوبت دهی آنلاین بیمارستان بهشتی</h1>
                <SearchBar
                    placeholder={'جستجوی پزشک'}
                    endChild={
                        <PrimaryButton
                            text={'همه پزشکان'}
                            onButtonClicked={navigateToAllDoctorsPage}
                        />
                    }
                />
            </div>
        </MainTemplate>
    )
}

export default Home;