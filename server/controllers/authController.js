const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

exports.registerUser = async(req, res) => {
    try{
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return res.status(400).json({message: "Please enter a valid email"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const user = await User.create({
            username,
            email,
            password,
            otp,
            otpExpiry,
        });
        res.status(201).json({message: "User registered successfully", user});

        // OTP SENDING LOGIC
        try{
            await sendEmail({
                to: email,
                subject: "OTP Verification for AI Cold Mail Generator",
                text: `Your OTP is ${otp}, It will expire in 10 minutes`,
            })
        }catch(err){
           console.log({message: 'Error Sending OTP', error: err.message});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
}