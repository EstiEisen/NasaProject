import produce from 'immer';
import createReducer from "./RducerUtiles";


const initialState = {
    user: {
        uid: "",
        name: "",
        mail: "",
        password: "",
        pictureList:[],
        jwt:""
    }
}
const users = {
    setUserUid(state, action) {
        state.user.uid = action.payload;
    },
    setUserName(state, action) {
        state.user.name = action.payload;
    },
    setUserEmail(state, action) {
        state.user.mail = action.payload;
    },
    setUserPassword(state, action) {
        state.user.password = action.payload;
    },
    setPictureToList(state, action) {
        state.user.pictureList = action.payload;
    },
    setJwt(state, action) {
        state.user.jwt = action.payload;
    }

};
export default produce((state, action) => createReducer(state, action, users), initialState);
