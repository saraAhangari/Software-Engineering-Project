import React, {useEffect, useState} from "react";
import MainTemplate from "../../components/container/MainTemplate";
import {Navigate, useNavigate} from "react-router-dom";
import CustomCard from "../../components/container/CustomCard";
import {Divider} from "@mui/material";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import CustomTextFiled from "../../components/text-field/CustomTextField";
import {safeApiCall} from "../../data/api/Api";
import {getToken, login} from "../../data/api/AuthenticationApi";
import {useAuth} from "../../auth/Auth";

function Login() {
    const navigate = useNavigate()

    const {token, loginUser} = useAuth();

    const [showOtpField, setShowOtpField] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});

    console.log('error');
    console.log(error);

    const [isDoctorLogin, setIsDoctorLogin] = useState(false);

    const [inputs, setInputs] = useState({
        nationalId: undefined,
        otp: undefined,
    });

    const handleTextFieldInputs = (event) => {
        setInputs(
            prevState => ({
                ...prevState,
                [event.target.name]: event.target.value,
            })
        )
    }

    if (token) {
        return <Navigate to='/patient-panel' />
    }

    function navigateToHome() {
        navigate('/')
    }

    function navigateToSignUp() {
        navigate('/signup')
    }

    function getButton(isActive, text, onClick) {
        if (isActive) {
            return PrimaryButton(
                {
                    text: text,
                    onButtonClicked: onClick,
                }
            )
        } else {
            return SecondaryButton(
                {
                    text: text,
                    onButtonClicked: onClick,
                }
            )
        }
    }

    function requestToken() {
        setError({});
        safeApiCall(
            getToken(inputs.nationalId, inputs.otp),
            setIsLoading,
            setError,
            loginUser,
        )
    }

    function requestLogin() {
        setError({});
        safeApiCall(
            login(inputs.nationalId),
            setIsLoading,
            setError,
            () => {
                setShowOtpField(true)
                setTimeout(() => {
                    setShowOtpField(false);
                }, 2 * 60 * 1000);
            },
        )
    }

    return (
        <MainTemplate buttonTitle={'صفحه اصلی'} onButtonClicked={navigateToHome}>
            <div className={'login-page'}>
                <CustomCard>

                    <h1 className={'title'}>ورود به حساب کاربری</h1>

                    <Divider className={'divider'}/>

                    <div
                        style={
                            {
                                display: 'flex',
                                flexDirection: 'row',
                                columnGap: '20px',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }
                        }
                    >
                        {
                            getButton(!isDoctorLogin, 'ورود کاربران', () => {
                                setIsDoctorLogin(false)
                            })
                        }
                        {
                            getButton(isDoctorLogin, 'ورود پزشکان', () => {
                                setIsDoctorLogin(true)
                            })
                        }
                    </div>

                    <CustomTextFiled
                        label={'کد ملی'}
                        name={'nationalId'}
                        errorMessage={error.national_id}
                        disabled={showOtpField}
                        style={
                            {
                                marginTop: '40px',
                            }
                        }
                        inputProps={
                            {
                                style: {
                                    background: 'var(--gray1, #D9D9D9)',
                                }
                            }
                        }
                        onTextChanged={handleTextFieldInputs}
                    />

                    {
                        showOtpField && <CustomTextFiled
                            label={'کد تایید'}
                            name={'otp'}
                            errorMessage={error.otp}
                            inputProps={
                                {
                                    style: {
                                        background: 'var(--gray1, #D9D9D9)',
                                    }
                                }
                            }
                            onTextChanged={handleTextFieldInputs}
                        />
                    }

                    <PrimaryButton
                        style={
                            {
                                marginTop: showOtpField ? '0' : '40px',
                                borderRadius: '15px',
                                padding: '15px'
                            }
                        }
                        isLoading={isLoading}
                        text={showOtpField ? 'ارسال کد تایید' : 'دریافت کد تایید'}
                        onButtonClicked={
                            () => {
                                if (showOtpField) {
                                    requestToken();
                                } else {
                                    requestLogin();
                                }
                            }
                        }
                    />
                    <a
                        style={
                            {
                                textAlign: 'center',
                                color: '#385399',
                                fontSize: '0.75rem',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                lineHeight: 'normal',
                            }
                        }
                        onClick={navigateToSignUp}
                    >حساب کاربری ندارید؟  ثبت نام</a>

                </CustomCard>
            </div>
        </MainTemplate>
    )
}

export default Login;