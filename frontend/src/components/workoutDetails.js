import { useAuthContext } from "../hooks/authContextHook";
import { useWorkoutsContext } from "../hooks/workoutsContextHook";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {

    const {dispatch}=useWorkoutsContext()
    const {user}=useAuthContext()


    const handleClick=async (e)=>{

        e.preventDefault()

        if(!user){
            return
        }

        const response = await fetch('http://localhost:4000/api/workouts/myworkouts/' + workout._id,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
       },
       credentials: 'include',
            
        }) 

        const json= await response.json()

        if(response.ok){
            dispatch({type:'DELETE_WORKOUT',payload:json})
        }


    }
    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Reps:</strong>{workout.reps}</p>
            <p><strong>Load:</strong>{workout.load}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{ addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
     );
}
 
export default WorkoutDetails;