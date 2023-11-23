import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import {validateEmail, validatePassword, validateRePassword, validateUserName} from "./Validation";
import CustomTextFiled from "../../components/text-field/CustomTextField";
import CustomTextFiledWithPasswordToggle from "../../components/text-field/CustomTextFiledWithPasswordToggle";

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
        <div className={'login-page'}>
            <form>
                <Box className={'form-container'}>

                    <p className={'title'}>Sign Up</p>

                    <CustomTextFiled
                        type={'text'}
                        name={'username'}
                        label={'Username'}
                        placeholder={'e.g, my_username'}
                        errorMessage={errors.username}
                        onTextChanged={handleInputs}
                    />

                    <CustomTextFiled
                        type={'email'}
                        name={'email'}
                        label={'Email'}
                        placeholder={'e.g, my_email@email.com'}
                        errorMessage={errors.email}
                        onTextChanged={handleInputs}
                    />

                    <CustomTextFiledWithPasswordToggle
                        type={'password'}
                        name={'password'}
                        label={'Password'}
                        errorMessage={errors.password}
                        onTextChanged={handleInputs}
                    />

                    <CustomTextFiledWithPasswordToggle
                        label={'Confirm password'}
                        name={'re_password'}
                        errorMessage={errors.re_password}
                        onTextChanged={handleInputs}
                    />

                    <Button
                        className={'button'}
                        variant="contained"
                        autoCapitalize={'false'}
                        onClick={submitInputs}
                    >Sign Up</Button>

                </Box>
            </form>
        </div>
    )
}

export default SignUp;
