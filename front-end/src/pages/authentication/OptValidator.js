import React, {useEffect, useRef, useState} from "react";
import CustomCard from "../../components/container/CustomCard";
import SimpleDialog from "../../components/dialog/SimpleDialog";
import {Divider, useTheme} from "@mui/material";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import CloseIcon from '@mui/icons-material/Close';
import CountDownTimer from "../../utils/CountDownTimer";
import {safeApiCall} from "../../data/api/Api";
import {register} from "../../data/api/AuthenticationApi";
import {useAuth} from "../../auth/Auth";
import {useNavigate} from "react-router-dom";

function OptValidator(
    {
        inputs,
        onClose,
    }
) {
    const theme = useTheme();
    const navigate = useNavigate();
    const {token, loginUser} = useAuth();

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const digitsSize = 6
    const [otp, setOtp] = useState(new Array(digitsSize).fill(""));
    const otpBoxReference = useRef([]);

    if (token) {
        navigate('/patient-panel');
    }

    function handleChange(value, index) {
        if (isLoading) {
            return
        }

        let newArr = [...otp];
        newArr[index] = value;
        setOtp(newArr);

        if (value && index - 1 >= 0) {
            otpBoxReference.current[index - 1].focus()
        }
    }

    function handleBackspaceAndEnter(e, index) {
        if (isLoading) {
            return
        }

        if (e.key === "Backspace" && !e.target.value && index + 1 < digitsSize) {
            otpBoxReference.current[index + 1].focus()
        }
        if (e.key === "Enter" && e.target.value && index - 1 >= 0) {
            otpBoxReference.current[index - 1].focus()
        }
    }

    const [isRetryButtonActive, setIsRetryButtonActive] = useState(false)
    const [remainingTime, setRemainingTime] = useState(undefined)
    const [restartTimer, setRestartButton] = useState(false)

    function formatDuration(duration) {
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.ceil((duration % (1000 * 60)) / 1000);
        seconds = seconds.toLocaleString(
            'en-US',
            {
                useGrouping :false,
                minimumIntegerDigits: 2,
            }
        )
        return `${minutes}:${seconds}`
    }

    useEffect(
        function startTimer() {
            CountDownTimer(
                119 * 1000, // 01:59
                function onRemaining(remainingTime) {
                    setRemainingTime(formatDuration(remainingTime))
                },
                function onFinish() {
                    setIsRetryButtonActive(true)
                },
            )
        },
        [restartTimer]
    )

    function validateOtp() {
        const otpCode = otp.reverse().join('')
        safeApiCall(
            register(inputs.first_name, inputs.last_name, inputs.national_id, inputs.phone_no, inputs.birthdate, inputs.assurance, inputs.gender, otpCode),
            setIsLoading,
            setErrors,
            loginUser,
        )
    }

    return (
        <SimpleDialog
            paperProps={
                {
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }
            }
        >
            <CustomCard
                style={
                    {
                        display: 'flex',
                        paddingTop: '10px',
                        paddingBottom: '16px',
                        position: 'relative',
                        flexDirection: 'column',
                    }
                }
            >
                <CloseIcon
                    style={
                        {
                            top: '40px',
                            color: 'red',
                            position: 'relative'
                        }
                    }
                    onClick={onClose}
                />

                <h1
                    style={
                        {
                            textAlign: 'center',
                            margin: '0 50px'
                        }
                    }
                >کد ارسال شده را وارد کنید</h1>

                <Divider
                    style={
                        {
                            background: theme.palette.divider,
                        }
                    }
                />

                <div
                    style={
                        {
                            gap: '20px',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '20px 50px'
                        }
                    }
                >
                    {
                        otp.map((digit, index) => (
                            <input
                                style={
                                    {
                                        flexGrow: 1,
                                        flexBasis: 0,
                                        maxWidth: '30px',
                                        minHeight: '30px',
                                        borderRadius: '5px',
                                        textAlign: 'center',
                                    }
                                }
                                key={index}
                                value={digit}
                                type={'digit'}
                                maxLength={1}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                                ref={(reference) => (otpBoxReference.current[index] = reference)}
                            />
                        ))
                    }
                </div>

                {
                    remainingTime && <p
                        style={
                            {
                                textAlign: 'center',
                            }
                        }
                    >{remainingTime}</p>
                }

                {
                    (
                        isRetryButtonActive ?
                            <PrimaryButton
                                style={
                                    {
                                        width: 'fit-content',
                                        alignSelf: 'center',
                                    }
                                }
                                text={'ارسال مجدد'}
                                onButtonClicked={
                                    () => {
                                        setIsRetryButtonActive(false)
                                        setRestartButton(!restartTimer)
                                    }
                                    // TODO: resend the Otp request
                                }
                            /> :
                            <PrimaryButton
                                style={
                                    {
                                        width: 'fit-content',
                                        alignSelf: 'center',
                                    }
                                }
                                text={'تایید کد'}
                                onButtonClicked={validateOtp}
                            />
                    )
                }

            </CustomCard>

        </SimpleDialog>
    )
}

export default OptValidator;