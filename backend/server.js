require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const WebRoutes=require('./routes/workouts')
const UserRoutes=require('./routes/users')

app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true  // This allows credentials (like cookies or authorization headers)
};
app.use(cors(corsOptions));





//middleware
app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})

//routes from the routed folder
app.use('/api/workouts',WebRoutes)
app.use('/api/users',UserRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    //listening
app.listen(process.env.PORT,()=>{
    console.log('listening on port',process.env.PORT,'!')

})
}
).catch((error)=>{
    console.log(error)
})




