import produce from 'immer';
import createReducer from "./RducerUtiles";

const initialState = {
    picture: {
        _id:'',
        date: "",
        explanation: "",
        title: "",
        url: "",
        mediaType: "",
        uid: ""
    },
    pictureHistory: []
}





const picture = {
    setPicture(state, action) {
        state.picture = action.payload;
    },
    setPictureHistory(state, action) {
        state.pictureHistory = action.payload;
    },
};

export default produce((state, action) => createReducer(state, action, picture), initialState);

