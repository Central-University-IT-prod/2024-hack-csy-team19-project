
import {applyMiddleware, combineReducers, compose, createStore} from "redux";

const ADD_POST = "addPostAction";
export const addPostAC=(text, author)=>({
    type: ADD_POST,
    text,
    author
})
 const SEND_MESSAGE="SEND_MESSAGE"
export const sendMessageAC=(text,author,dialogId)=>({
    type: SEND_MESSAGE,
    text,
    author,
    dialogId
})
function postReducer(state = {
    posts: {
        1:{author:"21",text:"21-21"},
        3:{author:"21",text:"21-21"},

    },
    postLastId:3
}, action) {
    switch (action.type) {
        case ADD_POST:
            const newId = state.postLastId + 1;
            let newState = {
                posts:JSON.parse(JSON.stringify(state.posts)),
                postLastId: newId
            }
            newState.posts[newId] = {
                text: action.text, author: action.author
            }
            console.log(newState)
            return newState
        default:
            return state
    }
}
function messagesReducer(state={
    messages:{
        1: {author: "21", text: "21-21"},
        2: {author: "21", text: "21-21"},
        3: {author: "21", text: "21-21"},
        4: {author: "21", text: "21-21"},
        5: {author: "21", text: "21-21"},
        6: {author: "21", text: "21-21"}
    },
    messageLastId:6,
    dialogs:{
        1: {name: "34", m: [1, 2, 3]},
        2: {name: "s0-", m: [4, 5, 6]}
    }
}, action) {
    switch (action.type){
        case SEND_MESSAGE:
            const newId = state.messageLastId + 1;
            let newState = {
                messages:JSON.parse(JSON.stringify(state.messages)),
                messageLastId:  newId,
                dialogs: JSON.parse(JSON.stringify(state.dialogs)),

            }
            newState.messages[newId]= {
                text:action.text, author:action.author
            }
            newState.dialogs[action.dialogId].m.push(newId)
            return newState
        default:
            return state
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({posts: postReducer, messages: messagesReducer})
export const store = createStore(rootReducer,composeEnhancers(applyMiddleware()))

