export default function reducer(state, action) {
    switch (action.type) {
        case "CURRENT_USER":
            return { ...state, user: action.payload };
        case "GET_HOME":
            return { ...state, user: action.payload };
        case "TRANSACTION":
            return { ...state, user: action.payload };
        case "WITHDRAW":
            return { ...state, user: action.payload };
        case "NOTIFICATION":
            return { ...state, notification: action.payload };
        case "LOADED":
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
