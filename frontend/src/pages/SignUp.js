import { useState } from "react"

import { useSignUp } from "../hooks/useSignupHook"


const SignUpForm = () => {


    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    const {error , loading ,emptyFields, signup} = useSignUp();
    


    const HandleClick= async (e)=>{
        e.preventDefault()

        //console.log(useSignUp())
        await signup(email,password)
      
    }

    return ( 
        <div >
            <form  className="signup" >
                <h3>Enter your credentials</h3>
                <label>Email:</label>
                <input type="text"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className={emptyFields?.includes('email') ? 'error' : ''}
                  
                    />

                <label>Password:</label>
                <input type="text"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 className={emptyFields?.includes('password') ? 'error' : ''}
                 
                 />

                
                
                <button disabled={loading} onClick={HandleClick}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
     );
}
 
export default SignUpForm;

