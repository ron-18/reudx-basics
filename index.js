const axios = require("axios");
const {createStore, combineReducers,applyMiddleware} =  require("redux");
const thunk = require("redux-thunk").default;

/*
// action types....
const  BUY_CAKE  = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//action creators.....
const buyCake = ()=>{
    return {
        type:BUY_CAKE
    }
}

const buyIceCream = ()=>{
    return {
        type:BUY_ICECREAM
    }
}

// initial states...
const initialCakeState ={
    noOfCake:10,
}

const initialIcecreamState ={
    noOfIceCream:20
}

//reducers....
const cakeReducer = (state=initialCakeState,action)=>{
    switch(action.type)
    {
        case BUY_CAKE:
            return {
                ...state,
                noOfCake:state.noOfCake-1
            }

        default:
            return state
    }
}

const iceCreamReducer = (state=initialIcecreamState,action) =>{
    switch(action.type)
    {
        case BUY_ICECREAM:
            return {
                ...state,
                noOfIceCream:state.noOfIceCream-1
            }
        default: return state
    }
}

//combining reducers....
const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
});

// store...
const store = createStore(rootReducer);


// performing or dispatching actions to store....
console.log(store.getState());

const unsubscribe = store.subscribe(()=>console.log("state: ",store.getState()));

console.log(store.dispatch(buyCake()));
console.log(store.dispatch(buyCake()));
console.log(store.dispatch(buyCake()));

console.log(store.dispatch(buyIceCream()));
console.log(store.dispatch(buyIceCream()));

*/

// initial state
const user ={
    loading:false,
    data:[],
    error:""
}

// user action types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// user action creators
const fetchUsersRequest = () =>{
    return {
        type:FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) =>{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersFailure = (error)=>{
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}

// user reducer

const userReducer = (state=user,action)=>{
    switch(action.type)
    {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.payload
            }
        case FETCH_USERS_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

// store for user
const store = createStore(userReducer,applyMiddleware(thunk));


// thunk action creator...
const fetchUsers =()=> async(dispatch)=>{
    dispatch(fetchUsersRequest());

    try{
        const response =  await axios.get("https://jsonplaceholder.typicode.com/users");
        dispatch(fetchUsersSuccess(response.data.map(d=>{console.log({id:d.id,name:d.name});return {id:d.id,name:d.name}})));
    }
    catch(err){
        err=>dispatch(fetchUsersFailure(err));
    }

}

store.dispatch(fetchUsers());

