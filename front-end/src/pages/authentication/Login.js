import React, {useState} from "react";
import MainTemplate from "../../components/container/MainTemplate";
import {useNavigate} from "react-router-dom";
import CustomForm from "../../components/container/CustomForm";
import {Button, Divider, Link, makeStyles, styled, useTheme} from "@mui/material";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import CustomTextFiled from "../../components/text-field/CustomTextField";

function Login() {
    const navigate = useNavigate()

    function navigateToHome() {
        navigate('/')
    }

    function navigateToSignUp() {
        navigate('/signup')
    }

    const [isDoctorLogin, setIsDoctorLogin] = useState(false);

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

    const [error, setError] = useState(undefined);

    return (
        <MainTemplate buttonTitle={'صفحه اصلی'} onButtonClicked={navigateToHome}>
            <div className={'login-page'}>
                <CustomForm>

                    <h1 className={'title'}>ورود به حساب کاربری</h1>

                    <Divider className={'divider'}/>

                    <div
                        style={
                            {
                                display: 'flex',
                                flexDirection: 'row',
                                columnGap: '20px',
                                flexWrap: 'wrap',
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
                        errorMessage={error}
                        style={
                            {
                                marginTop: '40px',
                            }
                        }
                    />

                    <PrimaryButton
                        style={
                            {
                                marginTop: '40px'
                            }
                        }
                        text={'دریافت کد تایید'}
                        onButtonClicked={
                            () => {
                                // TODO: send request
                                setError('هنوز این فیچر پیاده سازی نشده است.')
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

                </CustomForm>
            </div>
        </MainTemplate>
    )
}

export default Login;