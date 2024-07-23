import { useAuthContext } from "./authContextHook";
import { useWorkoutsContext } from "./workoutsContextHook";

export const useLogOut = () => {

    const {dispatch}= useAuthContext()
    const {dispatch :workoutsDispatch} = useWorkoutsContext()
    
    const logout =()=>{
        
        //delete from local storage
    localStorage.removeItem('user')

    //dispatch logout action

    
    workoutsDispatch({type:'SET_WORKOUTS',payload: null})
    dispatch({type:'LOGOUT'})

    }
    return  {logout};
}
 
