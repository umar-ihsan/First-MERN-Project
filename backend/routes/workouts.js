const express= require('express')

const requireAuth= require('../middleware/requireAuth')

const {welcomeHome,welcomeRoot,postWorkout,
       getWorkouts,getOneWorkout,deleteOneWorkout,
       replaceWorkout,updateWorkout} = require('../controllers/workoutControllers')



const router=express.Router()


router.get('/home',welcomeHome)

router.get('/',welcomeRoot)


// to verify Authorization for all workout routes 
router.use(requireAuth)

router.get('/myworkouts',getWorkouts)

router.get('/myworkouts/:id',getOneWorkout)

router.delete('/myworkouts/:id',deleteOneWorkout)

router.post('/myworkouts/',postWorkout)

router.put('/myworkouts/:id',replaceWorkout)

router.patch('/myworkouts/:id',updateWorkout)


module.exports=router

