const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Korisničko ime je obavezno"],
        trim: true,
        unique: true
    },
    email: {
      type: String,
          required: [true, "Email je obavezan"],
          trim: true,
          match: [
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Neispravan emil",
            ],
          unique: true,
    },
    password: {
        type: String,
        required: [true, "Lozinka je obavezna"],
    },
    level: {
      type: Number,
      default: 1
    },
    points: {
      type: Number,
      default: 0
    }
})

userSchema.pre('save', async function () {
    if(!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
userSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, username: this.username, email: this.email },
      process.env.JWT_SECRET
    )
  }
userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
  }

module.exports = mongoose.model("User", userSchema);