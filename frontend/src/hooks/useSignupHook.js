import { useState } from "react"
import { useAuthContext } from "../hooks/authContextHook"



export const useSignUp = ()=>{



    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const[emptyFields,setEmptyFields]=useState([]);

    const {dispatch} = useAuthContext();

  const signup= async (email,password)=>{

    setLoading(true)
    setError(null)
   

    

        const user= {email, password}

        const response = await fetch('http://localhost:4000/api/users/signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }) 

        const json= await response.json()

        if( !response.ok){
           
            setLoading(false)

            setError(json.error)
          
            setEmptyFields(json.emptyFields)
            console.log(error)
        }

        if (response.ok){

            setError(null)
            setLoading(false)
            
           
            setEmptyFields([])
            console.log('User Signed in Successfully!', json)

            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN',payload:json})
        }

        

  }

 
  return {error , loading ,emptyFields, signup}

}




