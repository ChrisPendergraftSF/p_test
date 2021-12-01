export const SET_STATUS_TYPE = "SET_STATUS_TYPE";

export const setStautsType = (statustype) => ({
    type: SET_STATUS_TYPE,
    statustype
});

const initialState = {
    statustype: undefined
};

export default function statustype(state = initialState, action){
    switch (action.type) {
        case SET_STATUS_TYPE:
            return { ...state, statustype: action.payload };
        default:
            return state;
    }
};
