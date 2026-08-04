// Importon React dhe hook-at per context, state dhe efekte.
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
// Krijon context-in global te perdoruesit me vlere fillestare bosh.
export const UserContext  = createContext({}) 
// Krijon provider-in qe i jep userInfo gjithe aplikacionit.
export const UserContextProvider = ({children}) => { 
  // State global ku ruhen te dhenat e perdoruesit te loguar.
  const [userInfo, setUserInfo] = useState({})
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/user/', {
          withCredentials: true,
        })
        setUserInfo(res.data || {})
      } catch (err) {
        setUserInfo({})
      } finally {
        setAuthLoading(false)
      }
    }

    loadCurrentUser()
  }, [])

  // Kthen provider-in me value qe permban state dhe setter-in.
  return ( 
    <UserContext.Provider value={{ userInfo, setUserInfo, authLoading }}> 
      {/* Renderon komponentet femije brenda provider-it. */}
      {children} 
    </UserContext.Provider> 
  )
}