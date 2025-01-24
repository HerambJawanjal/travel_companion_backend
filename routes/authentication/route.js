const express=require('express');

const controller=require('./controller')
const middleware=require('./middleware')

const router=express.Router();

router.post('/createUser',controller.createUser);

router.post('/loginUser',controller.loginUser);

module.exports=router;