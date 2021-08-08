import React, {useEffect} from "react";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

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

const App = ({signIn, signOut}) => {

    // if someone clear localstorage manually
    window.addEventListener("storage", () => {
        signOut();
        localStorage.clear();
        history.push('/');
    });

    // update login state with local storage every render after login
    if (userLoggedIn) {
        signIn(userId);
    }

    return (
        <Router history={history}>
            <Header/>
            <div className="main">
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={LandingPage}/>
                        <Route path="/registration" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/todo" exact component={UserTodo}/>
                    </Switch>
                </div>
            </div>
            <Footer/>
        </Router>
    );
};

export default connect(null, {signIn, signOut})(App);