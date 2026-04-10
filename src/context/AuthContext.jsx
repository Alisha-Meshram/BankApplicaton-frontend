import React, { createContext } from 'react'


export const AuthDataContext=createContext()
const AuthContext = ({children}) => {
    const serverUrl='https://bankapplication-backend-ela2.onrender.com'

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
