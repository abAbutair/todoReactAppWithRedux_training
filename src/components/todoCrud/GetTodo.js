import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getTodos} from "../../actions";

import CheckTodo from "./CheckTodo";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

const GetTodo = ({getTodos, userTodos}) => {

    useEffect(() => {
        getTodos();
    }, []);

    const todos = userTodos.map(todo => {
        const toBeDoneAt = todo.toBeDoneAt?.substring(0, 10);

        if (!todo) {
            return (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            );
        }

        return (
            <div className="col-sm-12 mb-3" key={todo._id}>
                <div className="card">
                    <div className="card-body">
                        <div className="card-body__dis">
                            <h5 className="card-title">{todo.title}</h5>
                            <p className="card-text">{todo.description}</p>
                            <p className="card-text">{toBeDoneAt}</p>

                            <CheckTodo ownTodo={todo} />
                        </div>
                        <div className="card-body__crud">
                            <EditTodo ownTodo={todo} />

                            <DeleteTodo ownTodo={todo} />
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="row">
            {todos}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userTodos: Object.values(state.todos),
    }
}

export default connect(mapStateToProps, {getTodos})(GetTodo);