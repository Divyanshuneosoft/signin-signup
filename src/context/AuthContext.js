import React,{useContext, useEffect, useState} from 'react';
import {auth} from '../firebase'

const AuthContext = React.createContext()
export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children})=>{
    const [loading,setLoading] = useState(true);
    const [currentUser,setCurrentUser] = useState(null);
    async function signUp(email,password,callback){
        try {
            await auth.createUserWithEmailAndPassword(email,password)
            return callback()
        } catch (error) {
            console.log(error)
        }
       
    }
    async function signIn(email,password,callback){
        try {
            await auth.signInWithEmailAndPassword(email,password)
            return callback() 
        } catch (error) {
            console.log(error)
        }
       
    }
    async function Logout(){
        return await auth.signOut()
    }
    async function forgotPassword(email,callback){
        try {
            await auth.sendPasswordResetEmail(email)
            return callback()
        } catch (error) {
            console.log(error)
        }
       
    }
    useEffect(()=>{
        const subscribe =  auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        }) 
        return subscribe
    },[])
    const value = {
        currentUser,
        signIn,
        signUp,
        Logout,
        forgotPassword,
    }
    return (
        <AuthContext.Provider value={value}>
         {!loading && children}
        </AuthContext.Provider>
    )
}