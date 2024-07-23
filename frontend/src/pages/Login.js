import { useState } from "react"

import { useLogin } from "../hooks/useLogInHook"


const LoginForm = () => {

    

    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    const {error , loading ,emptyFields, login} = useLogin()


    const HandleClick= async (e)=>{
        e.preventDefault()

        await login(email,password)

        
    }

    return ( 
        <div >
            <form className="login" >
                <h3>Enter your credentials</h3>
                <label>Email:</label>
                <input type="text"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className={emptyFields.includes('email') ? 'error' : ''}
                  
                    />

                <label>Password:</label>
                <input type="text"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 className={emptyFields.includes('password') ? 'error' : ''}
                 
                 />

                
                <button disabled={loading} onClick={HandleClick}>Log In</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
     );
}
 
export default LoginForm;