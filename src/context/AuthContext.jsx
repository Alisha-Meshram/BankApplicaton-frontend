import React, { createContext } from 'react'


export const AuthDataContext=createContext()
const AuthContext = ({children}) => {
    const serverUrl='http://localhost:7000/api'

    const value={
       serverUrl
    }
  return (
    <div>
    <AuthDataContext.Provider value={value}>{children}</AuthDataContext.Provider>
      
    </div>
  )
}

export default AuthContext
