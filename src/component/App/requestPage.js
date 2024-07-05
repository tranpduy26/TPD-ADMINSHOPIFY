import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  
  useEffect(() => {
    if (auth.isLoggedIn) navigate('/product-page')
  }, [auth.isLoggedIn, navigate])

  return <>{children}</>
}

export default RequireAuth
