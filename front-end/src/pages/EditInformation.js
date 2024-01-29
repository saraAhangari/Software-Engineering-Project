import React, { useRef, useState } from "react";
import MainTemplate from "../components/container/MainTemplate";
import CustomTextFiled from "../components/text-field/CustomTextField";
import Selector from "../components/text-field/Selector";
import JalaliDatePicker from "../components/text-field/JalaliDatePicker";
import { useTheme } from "@mui/material";
import PrimaryButton from "../components/button/PrimaryButton";

function EditInformation(props) {
    const theme = useTheme();

    const inputFieldStyle = {
        flexGrow: '1',
        flexBasis: '40%',
        height: 'fit-content',
        minWidth: 'min(100%, 300px)',
    }

    const currentValues = {
        name: 'نام کاربر',
        family: 'نام خانوادگی کاربر',
        gender: 'مرد',
        national_code: '01234567890',
        insurance: 'بیمه تامین اجتماعی',
        birthday: '1382/04/04',
        phone: '09126456789',
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
        }
    )

    const handleTextFieldInputs = (event) => {
        setInputs(
            prevState => ({
                ...prevState, [event.target.name]: event.target.value
            })
        )
    }

    const handleButtonClicked = () => {
        // TODO
    }

    const bloodTypes = [
        '+O',
        '-O',
        '+A',
        '-A',
        '+B',
        '-B',
        '+AB',
        '-AB',
    ]

    return (
        <MainTemplate
            hasLoggedIn={true}
        >
            <div
                style={
                    {
                        flex: '0',
                        width: '100%',
                        display: 'flex',
                        padding: '20px',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }
                }
            >

                <div
                    style={
                        {
                            gap: '20px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            padding: '20px 40px',
                            justifyContent: 'center',
                            width: 'min(100%, 800px)',
                            borderRadius: theme.shape.borderRadius,
                            background: theme.palette.background.paper,
                            boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                        }
                    }
                >
                    <p
                        style={
                            {
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                            }
                        }
                    >ویرایش اطلاعات</p>

                    <div
                        style={
                            {
                                width: '100%',
                                height: '1px',
                                margin: '5px 0',
                                background: 'black'
                            }
                        }
                    />

                    <CustomTextFiled
                        style={inputFieldStyle}
                        type={'text'}
                        label={'نام'}
                        name={'name'}
                        defaultValue={currentValues.name}
                    />

                    <CustomTextFiled
                        style={inputFieldStyle}
                        type={'text'}
                        label={'نام خانوادگی'}
                        name={'family'}
                        defaultValue={currentValues.family}
                    />

                    <Selector
                        style={inputFieldStyle}
                        label={'جنسیت'}
                        name={'gender'}
                        defaultValue={currentValues.gender}
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
                        style={inputFieldStyle}
                        label={'کد ملی'}
                        disabled={true}
                        defaultValue={currentValues.national_code}
                    />

                    <JalaliDatePicker
                        style={inputFieldStyle}
                        type={'date'}
                        name={'birthday'}
                        label={'تاریخ تولد'}
                        errorMessage={errors.birthday}
                        onTextChanged={handleTextFieldInputs}
                    />

                    <Selector
                        style={inputFieldStyle}
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
                        style={inputFieldStyle}
                        type={'tel'}
                        name={'phone'}
                        disabled={true}
                        label={'شماره موبایل'}
                        defaultValue={currentValues.phone}
                    />

                    <Selector
                        style={inputFieldStyle}
                        name={'blood_type'}
                        label={'گروه خونی'}
                        menuItems={bloodTypes}
                        onValueChanged={
                            (newValue) => {
                                console.log(newValue);
                                // TODO: handle the blood type.
                            }
                        }
                    />

                    <CustomTextFiled
                        style={
                            {
                                ...inputFieldStyle,
                                flexBasis: '30%',
                                minWidth: 'min(100%, 100px)'
                            }
                        }
                        type={'number'}
                        name={'height'}
                        label={'قد'}
                        errorMessage={errors.phone}
                        onTextChanged={handleTextFieldInputs}
                    />

                    <CustomTextFiled
                        style={
                            {
                                ...inputFieldStyle,
                                flexBasis: '30%',
                                minWidth: 'min(100%, 100px)'
                            }
                        }
                        type={'number'}
                        name={'weight'}
                        label={'وزن'}
                        errorMessage={errors.phone}
                        onTextChanged={handleTextFieldInputs}
                    />

                    <CustomTextFiled
                        style={
                            {
                                ...inputFieldStyle,
                                flexBasis: '30%',
                                minWidth: 'min(100%, 100px)'
                            }
                        }
                        type={'number'}
                        name={'blood_pressure'}
                        label={'فشار خون'}
                        errorMessage={errors.phone}
                        onTextChanged={handleTextFieldInputs}
                    />

                    <PrimaryButton
                        style={
                            {
                                flexBasis: "100%",
                                width: 'fit-content',
                                borderRadius: '10px',
                                maxWidth: '200px',
                                margin: '0 30px'
                            }
                        }
                        text={'ذخیره تغییرات'}
                        onButtonClicked={handleButtonClicked}
                    />
                </div>
            </div>
        </MainTemplate>
    )
}

export default EditInformation;