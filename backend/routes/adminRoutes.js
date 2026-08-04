const express = require("express")
const app = express()
const userModel = require("../models/AdminModel")
// bcrypt perdoret per hash (inkriptimin) dhe krahasim te fjalekalimeve.
const bcrypt = require("bcrypt")
// jsonwebtoken krijon dhe verifikon token-at JWT.
const jwt = require("jsonwebtoken")


// Route Login/Sign in
app.post("/login", async (req, res) => {
    try {
        // Kredencialet e derguara nga frontend (form React)
        const userInfo = req.body
        // Kerkon perdoruesin sipas email-it.
        const findUser = await userModel.findOne({ email: userInfo.email })
        if (findUser) {
            // Krahason fjalekalimin e dhene me hash-in ne databaze.
            const passwordCompare = bcrypt.compareSync(userInfo.password, findUser.password)
            if (passwordCompare) {
                // Krijon token me te dhenat baze te perdoruesit.
                const token = jwt.sign({ id: findUser._id, username: findUser.username, email: findUser.email },
                    "secret")
                // Ruhet token-i ne cookie httpOnly dhe kthehen te dhenat e perdoruesit.
                res.cookie("accessToken", token, { httpOnly: true, maxAge: 360000 })
                    .json({ id: findUser._id, username: findUser.username, email: findUser.email })
            } else {
                res.status(400).send("user not found")
            }
        } else {
            res.status(404).send("user not found")
        }
    } catch (err) {
        res.status(500).send("Not login")
    }
})

// Route User
app.get("/user", async (req, res) => {
    // Merr token-in nga cookie nese ekziston.
    const accessToken = req.cookies?.accessToken
    if (!accessToken) {
        return res.status(401).send("Unauthorized")
    }
    // Verifikon token-in 
    jwt.verify(accessToken, "secret", {}, (err, info) => {
        if (err) {
            console.log("Unauthorized")
            return res.status(401).send("Unauthorized")
        }
        // Kthen payload-in e token-it si pergjigje.
        res.status(200).send(info)
    })
})
// Route Logout / Sign out
app.post("/logout", async (req, res) => {
    res.cookie("accessToken", "", { expires: new Date(0), httpOnly: true })
        .json("Log out");
});


module.exports = app