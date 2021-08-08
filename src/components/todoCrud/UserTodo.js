import React from "react";
import {connect} from "react-redux";

import CreateTodo from "./CreateTodo";
import GetTodo from "./GetTodo";

import "./userTodo.scss";
import history from "../../history";

const UserTodo = ({isSignedIn}) => {
    const protect = () => {
        if (!isSignedIn) {
            return history.push('/');
        }
    }
    protect();

    return (
        <div className="todo">
            <div className="todo-create">
                <CreateTodo />
            </div>

            <div className="todo-view">
                <GetTodo />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.authentication.isSignedIn
    };
};

export default connect(mapStateToProps)(UserTodo);