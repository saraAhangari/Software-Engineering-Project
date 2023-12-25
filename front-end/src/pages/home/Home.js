import React from "react";
import {useNavigate} from 'react-router-dom';
import MainTemplate from "../../components/container/MainTemplate";
import SearchBar from "../../components/searchbar/SearchBar";

function Home() {
    const navigate = useNavigate();

    const navigateToLoginPage = (event) => {
        navigate('/login')
    }

    return (
        <MainTemplate buttonTitle={'ورود | ثبت نام'} onButtonClicked={navigateToLoginPage}>
            <div className={'home-page'}>
                <h1>نوبت دهی آنلاین بیمارستان بهشتی</h1>
                <SearchBar placeholder={'جستجوی پزشک'}/>
            </div>
        </MainTemplate>
    )
}

export default Home;