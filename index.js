const express=require('express')
const destinationRoute=require('./routes/places/route')
const authRoutes=require('./routes/authentication/route')

const router=express.Router();


router.use('/places', destinationRoute)
router.use('/auth',authRoutes);

module.exports=router;