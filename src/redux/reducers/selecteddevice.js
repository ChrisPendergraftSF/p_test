export const SET_SELECTED_DEVICE = "SET_SELECTED_DEVICE";

export const setSelectedDevice = (selecteddevice) => ({
    type: SET_SELECTED_DEVICE,
    selecteddevice,
});

const initialState = {
    selecteddevice: undefined,
};

export default function selecteddevice(state = initialState, action){
    switch (action.type) {
       case SET_SELECTED_DEVICE:
            const { selecteddevice } = action;
            return { ...state, selecteddevice };
        default:
            return state;
    }
};
