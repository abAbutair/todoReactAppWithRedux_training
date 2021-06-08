import React from "react";
import {Form, Field} from "react-final-form";

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

    const renderError = ({touched, error}) => {
        if (touched && error) {
            return (
                <span>{error}</span>
            );
        }
    };

    const registerValidate = e => {
        const errors = {};

        if (e.fullName && e.fullName.length < 5 ) {
            errors.fullName = 'Too short';
        }

        return errors;
    };

    const handleInput = ({input, meta, className, id, placeholder, label, labelClassName}) => {
        return (
            <React.Fragment>
                <label htmlFor={id} className={labelClassName}>{label}</label>
                <input {...input} placeholder={placeholder} className={className} id={id}/>
                {renderError(meta)}
            </React.Fragment>
        );
    };

    const renderRegisterForm = ({handleSubmit}) => {
        return (
            <React.Fragment>
                <h2>Registration</h2>

                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="mb-3">
                        <Field name="fullName" type="text" render={handleInput} className="form-control" id="fullName" placeholder="Full Name" label="Full Name" labelClassName="form-label" />
                    </div>
                    <div className="mb-3">
                        <Field name="email" type="email" render={handleInput} className="form-control" id="email" placeholder="Email" label="Email" labelClassName="form-label" />
                    </div>
                    <div className="mb-3">
                        <Field name="password" type="password" render={handleInput} className="form-control" id="password" placeholder="Password" label="Password" labelClassName="form-label" />
                    </div>
                    <div className="mb-3">
                        <Field name="confirmPassword" type="password" render={handleInput} className="form-control" id="confirmPassword" placeholder="Confirm Password" label="Confirm Password" labelClassName="form-label" />
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