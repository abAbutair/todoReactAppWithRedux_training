// import {IS_SIGNED_IN} from "./types";
//
// export const logIn = (userId) => async dispatch => {}

export const registerValues = (registerValues) => {
    return {
        type: "REGISTER_VALUES",
        payload: {...registerValues}
    }
};