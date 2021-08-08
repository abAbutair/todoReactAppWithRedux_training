import React from "react";
import {Form} from "react-final-form";
import {connect} from "react-redux";

import {signIn} from "../actions";
import backendApi from "../apis/backendApi";
import history from "../history";
import Input from "../formFields/Input";

const Login = ({signIn, isSignedIn}) => {

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
            signIn(data.userObject._id);
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

    const renderLoginForm = ({handleSubmit}) => {
        return (
            <React.Fragment>
                <h2>Login</h2>

                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="mb-3">
                        <Input name="email" type="email" labelName="Email" />
                    </div>

                    <div className="mb-3">
                        <Input name="password" type="password" labelName="Password" />
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