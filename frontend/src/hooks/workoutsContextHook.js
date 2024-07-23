import { useContext } from "react";
import { workoutsContext } from "../contexts/WorkoutsContext";

export const useWorkoutsContext = ()=>{

    const context = useContext(workoutsContext);

    if (!context){
        throw Error('useWorkoutsContext must be used inside a WorkoutsProvider')
    }

    return context
}