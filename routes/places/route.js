const express = require('express');
const controller=require('./controller');
const { authMiddleware } = require('../authentication/middleware');

const route = express.Router();

route.get('/getDestination',authMiddleware,controller.getDestinations );


module.exports=route;