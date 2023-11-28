import React, {Fragment, useState} from "react";
import CustomTextFiled from "../../components/text-field/CustomTextField";
import CustomCard from "../../components/container/CustomCard";
import PrimaryButton from "../../components/button/PrimaryButton";
import MainTemplate from "../../components/container/MainTemplate";
import Selector from "../../components/text-field/Selector";
import JalaliDatePicker from "../../components/text-field/JalaliDatePicker";
import {useNavigate} from "react-router-dom";
import OptValidator from "./OptValidator";
import {Divider, useTheme} from "@mui/material";

function SignUp() {
    const theme = useTheme()

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

    const [inputs, setInputs] = useState(
        {
            name: undefined,
            family: undefined,
            gender: undefined,
            national_code: undefined,
            insurance: undefined,
            birthday: undefined,
            phone: undefined,
            email: undefined,
        }
    )

    const [errors, setErrors] = useState(
        {
            name: undefined,
            family: undefined,
            gender: undefined,
            national_code: undefined,
            insurance: undefined,
            birthday: undefined,
            phone: undefined,
            email: undefined,
        }
    )

    console.log("inputs:");
    console.log(inputs);
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

    const submitInputs = (event) => {
        event.preventDefault()
        const error = {
            // TODO: handle errors
        }
        setErrors(error)
        if (error) {
            console.log("DONE :)")
            // TODO: send the inputs to the server.
            return showOtpValidatorDialog()
        }
    }

    return (
        <Fragment>
            <MainTemplate buttonTitle={'صفحه اصلی'} onButtonClicked={navigateToHome}>
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
                            type={'text'}
                            name={'name'}
                            label={'نام'}
                            errorMessage={errors.name}
                            onTextChanged={handleTextFieldInputs}
                        />

                        <CustomTextFiled
                            type={'text'}
                            name={'family'}
                            label={'نام خانوادگی'}
                            errorMessage={errors.family}
                            onTextChanged={handleTextFieldInputs}
                        />

                        <Selector
                            label={'جنسیت'}
                            name={'gender'}
                            menuItems={
                                ['مرد', 'زن']
                            }
                            onValueChanged={
                                (newValue) => {
                                    console.log(newValue);
                                    // TODO: handle the gender.
                                }
                            }
                        />

                        <CustomTextFiled
                            type={'number'}
                            name={'national_code'}
                            label={'کد ملی'}
                            errorMessage={errors.national_code}
                            onTextChanged={handleTextFieldInputs}
                        />


                        <JalaliDatePicker
                            type={'date'}
                            name={'birthday'}
                            label={'تاریخ تولد'}
                            errorMessage={errors.birthday}
                            onTextChanged={handleTextFieldInputs}
                        />

                        <Selector
                            label={'نوع بیمه'}
                            name={'insurance'}
                            menuItems={
                                [ // TODO: replace with the server response
                                    'بیمه درمان تامین اجتماعی',
                                    'بیمه درمان تکمیلی',
                                    'بیمه نیروهای مسلح',
                                    'بیمه‌ی خدمات درمانی',
                                ]
                            }
                            onValueChanged={
                                (newValue) => {
                                    console.log(newValue);
                                    // TODO: handle the insurance.
                                }
                            }
                        />

                        <CustomTextFiled
                            type={'tel'}
                            name={'phone'}
                            label={'شماره موبایل'}
                            errorMessage={errors.phone}
                            onTextChanged={handleTextFieldInputs}
                        />

                        <PrimaryButton
                            style={
                                {
                                    width: 'fit-content',
                                    alignSelf: 'center',
                                }
                            }
                            text={'ثبت نام و دریافت کد تایید'}
                            onButtonClicked={submitInputs}
                        />

                    </CustomCard>
                </div>
            </MainTemplate>

            {
                otpValidatorIsOpen && <OptValidator onClose={hideOtpValidatorDialog}/>
            }
        </Fragment>
    )
}

export default SignUp;
