const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [3, "Name cannot below 3 characters"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password cannot below 8 characters"],
        select: false
    }
    

});


userSchema.pre("save", async function(next){     //this. doesn't work with arrow function. Thaat's why use anonymous function.

    if(!this.isModified("password")){      //Becuase if we update only user information and not password, it will prevent rehashing of password.
        next();
    }

    this.password = await bcrypt.hash(this.password,10);

})

// JWT TOKEN

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password

userSchema.methods.comparePassword = async function(enteredPassword){
    
    return bcrypt.compare(enteredPassword, this.password);
    
}

module.exports = mongoose.model("User",userSchema);