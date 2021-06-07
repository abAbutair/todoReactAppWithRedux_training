const registerReducer = (state, action) => {
    switch (action.type) {
        case "REGISTER-VALUES":
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default registerReducer;