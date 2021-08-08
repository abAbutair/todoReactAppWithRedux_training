import React from "react";
import {connect} from "react-redux";
import {checkTodo, getTodos} from "../../actions";

const CheckTodo = ({ownTodo, checkTodo, getTodos}) => {

    const onTodoCompleteCheck = async (e) => {
        checkTodo(e.target.dataset.key);
        getTodos();
    };

    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value=""
                   defaultChecked={ownTodo.completed} id={`check_${ownTodo._id}`} data-key={ownTodo._id}
                   onChange={onTodoCompleteCheck}/>
            <label className="form-check-label" htmlFor={`check_${ownTodo._id}`}>
                Mark Done
            </label>
        </div>
    );
};

export default connect(null, {checkTodo, getTodos})(CheckTodo);