import React from "react";
import {Form, Field} from "react-final-form";
import {connect, useDispatch} from "react-redux";

import {signIn} from "../actions";
import backendApi from "../apis/backendApi";
import history from "../history";

const Login = ({isSignedIn}) => {
    const dispatch = useDispatch();

    const protect = () => {
        if (isSignedIn) {
            return history.push('/');
        }
    }
    protect();

    const onLoginFormSubmit = async formValues => {
        const {data} = await backendApi.post('/user/login', {
            email: formValues.email,
            password: formValues.password
        });

        if (data.msg === "logged in") {
            dispatch(signIn(data.userObject._id));
            localStorage.setItem("localStorageIsSignedIn", "true");
            localStorage.setItem("loginObject", JSON.stringify(data));
        }

        history.push('/');
    }

    const loginValidate = (e) => {
        const errors = {};

        if (e.email && e.email.length < 8) {
            errors.email = 'too short';
        }

        return errors;
    };

    const renderError = ({touched, error}) => {
        if (touched && error) {
            return (
                <span>{error}</span>
            );
        }
    };

    const handleInput = ({input, meta, className, id, placeholder, label, labelClassName}) => {
        return (
            <React.Fragment>
                <label htmlFor={id} className={labelClassName}>{label}</label>
                <input {...input} className={className} id={id} placeholder={placeholder} />
                {renderError(meta)}
            </React.Fragment>
        );
    };

    const renderLoginForm = ({handleSubmit}) => {
        return (
            <React.Fragment>
                <h2>Login</h2>

                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="mb-3">
                        <Field name="email" type="email" render={handleInput} className="form-control" id="email" placeholder="Email" label="Email" labelClassName="form-label"/>
                    </div>

                    <div className="mb-3">
                        <Field name="password" type="password" render={handleInput} className="form-control" id="password" placeholder="Password" label="Password" labelClassName="form-label"/>
                    </div>

                    <button type="submit" className="btn btn-dark">Login</button>
                </form>
            </React.Fragment>
        );
    }

    return (
        <div className="centered-block">
            <Form onSubmit={onLoginFormSubmit} validate={loginValidate} render={renderLoginForm}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.authentication.isSignedIn,
    };
};

export default connect(mapStateToProps,{signIn})(Login);