import {SHOW_HIDE_POPUP} from "../actions/types";

const INITIAL_STATE = {
    modalState: false,
    modalId: null
}
export const popupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_HIDE_POPUP:
            return {...state, modalState: action.payload.theBoolean, modalId: action.payload.modalId}
        default:
            return state
    }
};