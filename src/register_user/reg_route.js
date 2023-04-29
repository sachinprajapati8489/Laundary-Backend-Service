const express = require('express');
const Data = require('../Data_model/user_data');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let reg_log_app = express.Router();
reg_log_app.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, phone, state, district, address, pincode, password } = req.body;
        const user = await Data.findOne({ email });
        const user_mobile = await Data.findOne({ phone });
        if (user && user_mobile) {
            return res.status(400).json({
                status: "Failed",
                massage: "User Already exists with given email"
            })
        }
        await Data.create(req.body, function (err, resolve) {
            if (err) { console.log(err) }
            else {
                res.status(200).json({
                    status: "Success",
                    massage: "User succesfully register"
                })
            }
        });


    }
    catch (e) {
        res.json({
            status: "Failed Catch",
            massage: e.massage
        })
    }


});

reg_log_app.post('/login', async (req, res) => {

    try {
        let user;
        if (typeof (req.body.email) === Number) {
            user = await Data.findOne({ phone: req.body.email });
        }
        else {
            user = await Data.findOne({ email: req.body.email });
        }

        if (!user) {
            return res.status(400).json({
                status: "Failed",
                massage: "There no register user with this email!"
            })
        }
        const token = await jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user._id
        }, 'DIDBYSACHIN');
        console.log(token)
        return res.json({
            status: "success",
            massage: "Login succesful",
            token
        })
    }
    catch (e) {
        res.json({
            status: "Failed Catch",
            massage: e.massage
        })
    }


});
module.exports = reg_log_app;