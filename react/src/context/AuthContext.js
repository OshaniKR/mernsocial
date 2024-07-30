import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"


const INITIAL_STATE ={
    user:JSON.parse(localStorage.getItem('user')) || {
        _id:"665ff0d0eb26366116db8bc5",
        username:"Malan",
        email:"Malan1234@gmail.com",
        profilePicture:"person/person5.jpeg",
        coverPicture:"",
        isAdmin:false,
        followers:[],
        followings:[],
        



    },
    isFetching:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider =({children})=>{
    const[state,dispatch] =useReducer(AuthReducer,INITIAL_STATE)

    return(
        <AuthContext.Provider 
         value={{
            user:state.user,
            isFetching:state.isFetching, 
            error:state.error,
            dispatch,
         }}>
            
            {children}

        </AuthContext.Provider>
    )
} 