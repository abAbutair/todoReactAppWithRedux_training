import {combineReducers} from "redux";
import {authenticationReducer} from "./authenticationReducer";
import {getAndDeleteTodosReducer, createTodoReducer, editTodoReducer, checkTodoReducer} from "./todoReducer";
import {popupReducer} from "./popupReducer";

export default combineReducers({
   authentication: authenticationReducer,
   popupState: popupReducer,
   todos: getAndDeleteTodosReducer,
   createTodoMessage: createTodoReducer,
   // editTodoMessage: editTodoReducer,
   checkTodoMessage: checkTodoReducer,

});