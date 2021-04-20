import React from 'react'
import Navbar from '../../components/layout/navbar/navbar';
import LoginForm from '../../components/loginForm';

const Login = () => {
  return (
    <div>
      {/* <Navbar
        handleOpenDrawer={handleOpenDrawer}
        opened={open}
      /> */}

      <LoginForm />
    </div>
  )
}

export default Login;