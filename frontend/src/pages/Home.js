import { useEffect} from 'react';
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/workoutsContextHook';
import { useAuthContext } from '../hooks/authContextHook';

const Home = () => {

    const {workouts,dispatch}=useWorkoutsContext();
    const {user}=useAuthContext();
    

    useEffect(()=>{
        const fetchWorkouts = async () => {
            try {
              const response = await fetch('http://localhost:4000/api/workouts/myworkouts/',{
                headers: {
                  'Authorization': `Bearer ${user.token}`
                },
                credentials: 'include'
              });
              const json = await response.json();
          
              if (!response.ok) {
                console.log('fetch failed');
                throw new Error(json.message || 'Failed to fetch');
              } else {
                console.log('fetch success');
                dispatch({type:'SET_WORKOUTS',payload:json});
                
              }
            } catch (error) {
              console.error('Network error:', error);
              
              // Handle network error here (e.g., display an error message to the user)
            }
          };

          if(user){
            fetchWorkouts()
          }

    },[dispatch,user])
    return ( 
        <div className="home">

            <div className="WorkoutDetails">

                {workouts && workouts.map((workout)=>(
                    
                    <WorkoutDetails key={workout._id} workout={workout}/>
                )) }
            </div>

            <div className="workout-form">
                <WorkoutForm/>
            </div>
            
        </div>


     );
}
 
export default Home;