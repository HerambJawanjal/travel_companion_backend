const { query } = require("express");
const pool = require("../../config/db");
const bycrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
require('dotenv').config();




exports.createUser = async (req, res) => {
    try {
        const { firstname, lastname, password, mobileNo, email } = req.body;
        
        if (!firstname || !lastname || !password || !mobileNo || !email) {
            res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }
        const user = await pool.query(
            `SELECT * FROM travel_companion.users WHERE email='${email}'`
        );
        if (user.rows.length > 0) {
            res.status(409).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        const salt = await bycrypt.genSalt(10);

        const hashpassword = await bycrypt.hash(password, salt);
        const query = await pool.query(
            `INSERT INTO travel_companion.users (first_name, last_name, email, password, mobile_number) 
             VALUES ('${firstname}', '${lastname}', '${email}', '${hashpassword}', ${mobileNo})`
        );

       
        return res.status(201).json({
            success: true,
            message: "user creates succesfully"
        })

    } catch (error) {
        console.log("create user erro", error);
        res.status(500).json({
            success: false,
            message: error.message || "user not  created",

        })
    }
};






exports.loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
       

        if(!email || !password){
            res.status(400).json({
                message:"All field are required",
                success:false
            })
        }

        const user= await pool.query(`SELECT * FROM travel_companion.users WHERE email='${email}'`);
       
        if(user.rows.length<=0){
            console.log("inside if")

            return res.status(401).json({
                message:"invalid credentials",
                success:false
            })
        }

       

       const hashedPassword=user.rows[0].password ;
       

        const is_match=await bycrypt.compare(password,hashedPassword);

        

        if(!is_match){
            return res.status(401).json({
                message:"invalid password",
                success:false
            })
        }

        const token= jwt.sign({
            userid:user.rows[0].id,
            firstname:user.rows[0].first_name,
            lastname:user.rows[0].last_name,
            email:user.rows[0].email,
            mobile:user.rows[0].mobile_number,
        },process.env.JWT_SECRET_KEY)


        return res.status(200).json({
            success:true,
            message:"api test success",
            token:token,
        })

    } catch (error) {
        console.log("login error",error);
        res.status(500).json({
            success:false,
            message:"login error"
        })
    }
}
