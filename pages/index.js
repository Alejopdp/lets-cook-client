import React from "react";
import LoginForm from "../components/loginForm";

const Login = (props) => {
    // useEffect(() => {
    //   if (!props.isTokenOk) {
    //   }
    // }, [])

    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default Login;

// Login.getStaticProps = async (context) => {
//   // const token = context.getParam
//   const res = await validateToken(token)

//   if (res.status === 200) {
//     return {
//       isTokenOk: true
//     }
//   }
// }
