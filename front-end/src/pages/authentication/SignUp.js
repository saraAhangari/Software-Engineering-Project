import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import {validateEmail, validatePassword, validateRePassword, validateUserName} from "./Validation";
import CustomTextFiled from "../../components/text-field/CustomTextField";
import CustomTextFiledWithPasswordToggle from "../../components/text-field/CustomTextFiledWithPasswordToggle";
import CustomForm from "../../components/container/CustomForm";
import PrimaryButton from "../../components/button/PrimaryButton";

function SignUp() {
    const [inputs, setInputs] = useState(
        {
            username: undefined,
            email: undefined,
            password: undefined,
            re_password: undefined,
        }
    )

    const [errors, setErrors] = useState(
        {
            username: undefined,
            email: undefined,
            password: undefined,
            re_password: undefined,
        }
    )

    console.log("inputs:");
    console.log(inputs);
    console.log("error:");
    console.log(errors);

    const handleInputs = (event) => {
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
            username: validateUserName(inputs.username),
            email: validateEmail(inputs.email),
            password: validatePassword(inputs.password),
            re_password: validateRePassword(inputs.password, inputs.re_password),
        }
        setErrors(error)
        if (!error.username && !error.email && !error.password && !error.re_password) {
            console.log("DONE :)")
            // TODO: send the inputs to the server.
        }
    }

    return (
        <div className={'signup-page'}>
            <form>
                <CustomForm>

                    <p className={'title'}>Sign Up</p>

                    <CustomTextFiled
                        type={'text'}
                        name={'name'}
                        label={'نام'}
                        errorMessage={errors.name}
                        onTextChanged={handleInputs}
                    />

                    <CustomTextFiled
                        type={'text'}
                        name={'family'}
                        label={'نام خانوادگی'}
                        errorMessage={errors.family}
                        onTextChanged={handleInputs}
                    />

                    <CustomTextFiled
                        type={'text'}
                        name={'gender'}
                        label={'جنسیت'}
                        errorMessage={errors.gender}
                        onTextChanged={handleInputs}
                    />

                    <CustomTextFiled
                        type={'number'}
                        name={'national_code'}
                        label={'کد ملی'}
                        errorMessage={errors.national_code}
                        onTextChanged={handleInputs}
                    />


                    <CustomTextFiled
                        type={'date'}
                        name={'birthday'}
                        label={'تاریخ تولد'}
                        errorMessage={errors.birthday}
                        onTextChanged={handleInputs}
                    />

                    <CustomTextFiled
                        type={'email'}
                        name={'email'}
                        label={'ایمیل'}
                        errorMessage={errors.email}
                        onTextChanged={handleInputs}
                    />

                    <PrimaryButton
                        text={'ثبت نام و دریافت کد تایید'}
                        onButtonClicked={submitInputs}
                    />

                </CustomForm>
            </form>
        </div>
    )
}

export default SignUp;
