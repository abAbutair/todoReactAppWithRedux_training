import React, {useEffect} from "react";
import {Router, Route, Switch} from "react-router-dom";
import {connect, useDispatch} from "react-redux";

import {userLoggedIn, userId} from "./localStorage";
import history from "./history";
import {signIn, signOut} from "./actions";

import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import LandingPage from "./components/landingPage/LandingPage";
import Register from "./registration/Register";
import Login from "./registration/Login";
import UserTodo from "./components/todoCrud/UserTodo";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./app.scss";

const App = () => {
    const dispatch = useDispatch();

    // if someone clear localstorage manually
    window.addEventListener("storage", () => {
        dispatch(signOut());
        localStorage.clear();
        history.push('/');
    });

    useEffect(() => {
        if (userLoggedIn) {
            dispatch(signIn(userId));
        }
    }, [userLoggedIn, userId]);

    return (
        <Router history={history}>
            <Header/>
            <div className="container">
                <Switch>
                    <Route path="/" exact component={LandingPage}/>
                    <Route path="/registration" exact component={Register}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/todo" exact component={UserTodo}/>
                </Switch>
            </div>
            <Footer/>
        </Router>
    );
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.authentication.isSignedIn,
    };
};

export default connect(mapStateToProps, {signIn, signOut})(App);