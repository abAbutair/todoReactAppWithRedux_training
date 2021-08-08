import React from "react";
import {Form} from "react-final-form";

import Input from "../formFields/Input";

import backendApi from "../apis/backendApi";
import history from "../history";
import "./register.scss";

const Register = () => {
    const onRegisterSubmit = async (formValues) => {
        const {data} = await backendApi.post("/user/register", {
            name: formValues.fullName,
            email: formValues.email,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword
        });

        if (data.msg === "Registered") {
            history.push("/");
        }
    };

    const registerValidate = e => {
        const errors = {};

        if (e.fullName && e.fullName.length < 5 ) {
            errors.fullName = 'Too short';
        }

        return errors;
    };

    const renderRegisterForm = ({handleSubmit}) => {
        return (
            <React.Fragment>
                <h2>Registration</h2>

                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="mb-3">
                        <Input name="fullName" type="text" labelName="Full Name" />
                    </div>
                    <div className="mb-3">
                        <Input name="email" type="email" labelName="Email" />
                    </div>
                    <div className="mb-3">
                        <Input name="password" type="password" labelName="Password" />
                    </div>
                    <div className="mb-3">
                        <Input name="confirmPassword" type="password" labelName="Confirm Password" />
                    </div>
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
            </React.Fragment>
        );
    };

    return (
        <div className="centered-block">
            <Form onSubmit={onRegisterSubmit} validate={registerValidate} render={renderRegisterForm}/>
        </div>
    );
};

export default Register;