import React, {Fragment, useEffect, useState} from "react";
import CustomTextFiled from "../../components/text-field/CustomTextField";
import CustomCard from "../../components/container/CustomCard";
import PrimaryButton from "../../components/button/PrimaryButton";
import MainTemplate from "../../components/container/MainTemplate";
import Selector from "../../components/text-field/Selector";
import JalaliDatePicker from "../../components/text-field/JalaliDatePicker";
import {useNavigate, Navigate} from "react-router-dom";
import OptValidator from "./OptValidator";
import {Divider, useTheme} from "@mui/material";
import {safeApiCall} from "../../data/api/Api";
import {validate} from "../../data/api/AuthenticationApi";
import {useAuth} from "../../auth/Auth";
import {Gender} from "../../data/model/Models";
import {getAllAssurances} from "../../data/api/AssuranceApi";

function SignUp() {
    const {token} = useAuth();
    const theme = useTheme();
    const navigate = useNavigate()

    function navigateToHome() {
        navigate('/')
    }

    const [otpValidatorIsOpen, setOtpValidatorIsOpen] = useState(false)

    function showOtpValidatorDialog() {
        setOtpValidatorIsOpen(true)
    }

    function hideOtpValidatorDialog() {
        setOtpValidatorIsOpen(false)
    }

    const [inputs, setInputs] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    console.log("error:");
    console.log(errors);

    const handleTextFieldInputs = (event) => {
        console.log(`event: ${event.target.name} -> ${event.target.value}`)
        setInputs(
            prevState => ({
                ...prevState, [event.target.name]: event.target.value
            })
        )
    }

    const [assurances, setAssurances] = useState([]);
    useEffect(
        () => {
            getAllAssurances().then(r => {
                setAssurances(r)
            }).catch(e => {
                setAssurances([])
            })
        },
        [],
    )

    const submitInputs = (event) => {
        event.preventDefault()
        setErrors({});
        safeApiCall(
            validate(inputs.first_name, inputs.last_name, inputs.national_id, inputs.phone_no, inputs.birthdate, inputs.assurance, inputs.gender),
            setIsLoading,
            setErrors,
            () => {
                showOtpValidatorDialog()
            }
        )
    };

    const handleGenderInput = (newValue) => {
        switch (newValue) {
            case Gender.Male.title:
                inputs.gender = Gender.Male.value;
                break;
            case Gender.Female.title:
                inputs.gender = Gender.Female.value;
                break;
        }
    }

    const handleAssuranceInput = (newValue) => {
        inputs.assurance = assurances.find((item) => {
            return item.name === newValue
        }).id
    }

    const handleBirthDateInput = (newValue) => {

        function formatWithTwoDigit(num) {
            return num < 10 ? `0${num}` : `${num}`;
        }

        const date = newValue.$d;
        inputs.birthdate = `${date.getUTCFullYear()}-${formatWithTwoDigit(date.getUTCMonth())}-${formatWithTwoDigit(date.getDate())}`;
    }

    if (token) {
        return <Navigate to={'/patient-panel'}/>
    }

    return (
        <Fragment>
            <MainTemplate showLoginButton={false}>
                <div className={'signup-page'}>
                    <CustomCard>

                        <p className={'title'}>ثبت نام</p>

                        <Divider
                            style={
                                {
                                    background: theme.palette.divider,
                                }
                            }
                        />

                        <CustomTextFiled
                            name={'first_name'}
                            label={'نام'}
                            type={'text'}
                            disabled={isLoading}
                            errorMessage={errors.first_name}
                            onTextChanged={handleTextFieldInputs}
                        />

                        <CustomTextFiled
                            type={'text'}
                            name={'last_name'}
                            disabled={isLoading}
                            label={'نام خانوادگی'}
                            errorMessage={errors.last_name}
                            onTextChanged={handleTextFieldInputs}
                        />

                        <Selector
                            label={'جنسیت'}
                            name={'gender'}
                            disabled={isLoading}
                            error={errors.gender}
                            menuItems={
                                [Gender.Male.title, Gender.Female.title]
                            }
                            onValueChanged={handleGenderInput}
                        />

                        <CustomTextFiled
                            type={'number'}
                            name={'national_id'}
                            label={'کد ملی'}
                            disabled={isLoading}
                            errorMessage={errors.national_id}
                            onTextChanged={handleTextFieldInputs}
                        />


                        <JalaliDatePicker
                            type={'date'}
                            name={'birthdate'}
                            label={'تاریخ تولد'}
                            disabled={isLoading}
                            error={errors.birthdate}
                            onDateChanged={handleBirthDateInput}
                        />

                        <Selector
                            label={'نوع بیمه'}
                            name={'assurance'}
                            disabled={isLoading}
                            error={errors.assurance}
                            menuItems={
                                assurances.map(item => {
                                    return item.name
                                })
                            }
                            onValueChanged={handleAssuranceInput}
                        />

                        <CustomTextFiled
                            type={'tel'}
                            name={'phone_no'}
                            disabled={isLoading}
                            label={'شماره موبایل'}
                            errorMessage={errors.phone_no}
                            onTextChanged={handleTextFieldInputs}
                        />

                        <PrimaryButton
                            style={
                                {
                                    padding: '15px',
                                    alignSelf: 'center',
                                }
                            }
                            isLoading={isLoading}
                            text={'ثبت نام و دریافت کد تایید'}
                            onButtonClicked={submitInputs}
                        />

                    </CustomCard>
                </div>
            </MainTemplate>

            {
                otpValidatorIsOpen && <OptValidator inputs={inputs} onClose={hideOtpValidatorDialog}/>
            }
        </Fragment>
    )
}

export default SignUp;
