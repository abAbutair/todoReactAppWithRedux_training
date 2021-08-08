import {SIGN_IN, SIGN_OUT, CREATE_TODO, GET_TODOS, EDIT_TODO, CHECK_TODO, DELETE_TODO, SHOW_HIDE_POPUP} from "./types";
import backendApi from "../apis/backendApi";
import {accessToken, refreshToken, userId} from "../localStorage";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
};


// Todos CRUD
export const createTodo = (formValues, selectedDate) => async dispatch => {
    const {data} = await backendApi.post('/todo/createtodo', {
        userId: userId,
        title: formValues.title,
        description: formValues.description,
        toBeDoneAt: selectedDate,
        completed: false
    }, {
        headers: {
            "Content-Type": "application/json",
            auth: `Bearer ${accessToken}`,
            refreshToken
        }
    });

    dispatch({
        type: CREATE_TODO,
        payload: data._id
    });
};

export const getTodos = () => async dispatch => {
    const {data} = await backendApi.get('/todo/gettodos', {
        headers: {
            "Content-Type": "application/json",
            auth: `Bearer ${accessToken}`,
            refreshToken
        }
    });

    dispatch({
        type: GET_TODOS,
        payload: data.todos
    });
};

export const editTodo = (formValues, selectedDate, todoId) => async dispatch => {
    const {data} = await backendApi.put(`/todo/edittodo/${todoId}`, {
        title: formValues[`title-${todoId}`],
        description: formValues[`description-${todoId}`],
        toBeDoneAt: selectedDate,
        userId: userId
    }, {
        headers: {
            "Content-Type": "application/json",
            auth: `Bearer ${accessToken}`,
            refreshToken
        }
    });

    dispatch({
        type: EDIT_TODO,
        payload: data
    });
};

export const checkTodo = (todoId) => async dispatch => {
    const {data} = await backendApi.put(`/todo/marktodo/${todoId}`,{},{
        headers: {
            "Content-Type": "application/json",
            auth: `Bearer ${accessToken}`,
            refreshToken
        }
    });

    dispatch({
        type: CHECK_TODO,
        payload: todoId
    });
};

export const deleteTodo = (todoId) => async dispatch => {
    const {data} = await backendApi.delete(`/todo/removetodo/${todoId}`, {
        headers: {
            "Content-Type": "application/json",
            auth: `Bearer ${accessToken}`,
            refreshToken
        }
    });

    dispatch({
        type: DELETE_TODO,
        payload: todoId
    });
};

// End of Todos Crud

// PopupModal state
export const showHidePopup = (theBoolean, modalId) => {
    return {
        type: SHOW_HIDE_POPUP,
        payload: {
            theBoolean,
            modalId
        }
    };
};