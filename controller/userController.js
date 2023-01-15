const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const { Error } = require("mongoose");

// Register a User

exports.registerUser = catchAsyncErrors( async(req,res,next) => {
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password
    });

    sendToken(user, 201 ,res);
})

// Login User

exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const {email, password} = req.body;

    // Checking if user has given password and email both

    if (!email || !password){
        return next(new ErrorHandler("Please enter both email & password", 400));
    }

    const user = await User.findOne({email:email}).select("+password");

    if (!user){
        return next(new ErrorHandler("Invalid email and/or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched){
        return next(new ErrorHandler("Invalid email and/or password", 401));
    }

    sendToken(user, 200, res);
});


// Get User Detail

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success:true,
        user
    });
});



