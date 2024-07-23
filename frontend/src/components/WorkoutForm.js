import { useState } from "react"
import { useWorkoutsContext } from "../hooks/workoutsContextHook"
import { useAuthContext } from "../hooks/authContextHook"


const WorkoutForm = () => {

    const {user}=useAuthContext()

    const {dispatch}=useWorkoutsContext()

    const [title,setTitle]= useState('')
    const [load,setLoad]= useState('')
    const [reps,setReps]= useState('')
    const [error,setError]= useState('')
    
    const[emptyFields,setEmptyFields]=useState([])


    const handleClick= async (e)=>{
        e.preventDefault()

        if(!user){
            setError('You must be Logged in!')
            return
        }

        const workout= {title, load, reps}

        const response = await fetch('http://localhost:4000/api/workouts/myworkouts/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                     'Authorization': `Bearer ${user.token}`
            },
            credentials: 'include',
            body: JSON.stringify(workout)
        }) 

        const json= await response.json()

        if( !response.ok){

            
          
            setEmptyFields(json.emptyFields)
            console.log('workout not added')
        }

        if (response.ok){

            setTitle('')
            setLoad('')
            setReps('')
           
            setEmptyFields([])
            console.log('New Workout Added', json)
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }

    }

    return ( 
        <div className="workout-form">
            <form >
                <h3>Enter details of the new Excercise</h3>
                <label>Title:</label>
                <input type="text"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  className={emptyFields.includes('title') ? 'error' : ''}
                  
                    />

                <label>Load:</label>
                <input type="number"
                 value={load}
                 onChange={(e)=>setLoad(e.target.value)}
                 className={emptyFields.includes('load') ? 'error' : ''}
                 
                 />

                <label>Reps:</label>
                <input type="number"
                 value={reps}
                 onChange={(e)=>setReps(e.target.value)}
                 className={emptyFields.includes('reps') ? 'error' : ''}
                 
                 />

                <button onClick={handleClick} >Add Workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
     );
}
 
export default WorkoutForm;