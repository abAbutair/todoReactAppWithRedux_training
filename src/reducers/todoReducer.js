import {GET_TODOS, CREATE_TODO, EDIT_TODO, CHECK_TODO, DELETE_TODO} from "../actions/types";

export const getAndDeleteTodosReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TODOS:
            const oldState = {};
            for (let [key, value] of Object.entries(state)) {
                oldState[key] = value;
            }

            const todosObject = {};
            action.payload.forEach(todo => {
                todosObject[todo._id] = todo;
            });

            return {...todosObject, ...oldState}

        case DELETE_TODO:
            const newObject2 = {};
            for (const [key, value] of Object.entries(state)) {
                if (!(key === action.payload)) {
                    newObject2[key] = value;
                }
            }
            return {...newObject2}
        default:
            return state
    }
};

export const createTodoReducer = (state = '', action) => {
    switch (action.type) {
        case CREATE_TODO:
            return action.payload
        default:
            return state
    }
};
export const editTodoReducer = (state = '', action) => {
    switch (action.type) {
        case EDIT_TODO:
            return action.payload
        default:
            return state
    }
};
export const checkTodoReducer = (state = '', action) => {
    switch (action.type) {
        case CHECK_TODO:
            return action.payload
        default:
            return state
    }
};
