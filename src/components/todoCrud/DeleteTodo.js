import React from "react";
import {connect} from "react-redux";
import {deleteTodo, getTodos} from "../../actions";

const DeleteTodo = ({ownTodo, deleteTodo, getTodos}) => {
    const onDeleteClick = async (id) => {
        deleteTodo(id);
        getTodos();
    };

    return (
        <span className="span" onClick={() => onDeleteClick(ownTodo._id)}>
            <i className="bi bi-trash-fill"/>
        </span>
    );
};

export default connect(null, {deleteTodo, getTodos})(DeleteTodo);