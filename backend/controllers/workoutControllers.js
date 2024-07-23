const mongoose= require('mongoose')

const Workout=require('../models/workoutmodel')





const welcomeHome= async (req,res)=>{
    res.status(200).json({message:"Welcome to the home page"})
}

const welcomeRoot= async (req,res)=>{
    res.status(200).json({message:"Welcome to the Root of the page"})
}



const postWorkout = async (req,res)=>{


    const user_id=req.user._id

    const{title,reps,load}=req.body

    const emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
        }
    if(!load){
        emptyFields.push('load')
        }

        if(emptyFields.length>0){
            return res.status(400).json({error:'Please fill in all the fields',emptyFields})
        }
    try{

        const workout= await Workout.create({title,reps,load,user_id})
        res.status(200).json(workout)

    } catch(error){
        res.status(400).json({error:error.mssg,emptyFields})

    }
} 

const getWorkouts = async (req,res)=>{

    const user_id=req.user._id
  
    const workouts= await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

const getOneWorkout = async (req,res)=>{
    const {id}=req.params

       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({mssg: 'Please Enter a valid ID'})
       }
    
        
        const workout= await Workout.findById(id)

        if(!workout){
            return res.status(404).json({mssg: 'No such workout found!'})
        }

        res.status(200).json(workout)
    
}

const deleteOneWorkout = async (req,res)=>{
    const {id}=req.params

       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({mssg: 'Please Enter a valid ID'})
       }
    
        
        const workout= await Workout.findOneAndDelete({_id:id})

        if(!workout){
            return res.status(404).json({mssg: 'No such workout found!'})
        }

        res.status(200).json(workout)
    
}

const replaceWorkout = async (req,res)=>{
    const {id}=req.params
    const {title,reps,load}=req.body

       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({mssg: 'Please Enter a valid ID'})
       }
    
        
        const workout= await Workout.findOneAndReplace({_id:id},{title,reps,load})

        if(!workout){
            return res.status(404).json({mssg: 'No such workout found!'})
        }

        res.status(200).json(workout)
    
}

const updateWorkout = async (req,res)=>{
    const {id}=req.params
    

       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({mssg: 'Please Enter a valid ID'})
       }
    
        
        const workout= await Workout.findOneAndUpdate({_id:id},{...req.body})

        if(!workout){
            return res.status(404).json({mssg: 'No such workout found!'})
        }

        res.status(200).json(workout)
    
}




module.exports={ welcomeHome,welcomeRoot,postWorkout,
                 getWorkouts,getOneWorkout,deleteOneWorkout,
                 replaceWorkout,updateWorkout}