const express = require('express');
const Data = require('../Data_model/user_data');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let valid_route = express.Router();

valid_route.get('/successfulLogin', async (req, res) => {
    try {
        let user = req.user
        const post = await Data.find({ _id: user });
        res.status(200).json({
            status: "success",
            post
        })
    }
    catch (e) {
        res.status(401).json({
            status: 'Fail to get response from valid_route.get!!',
            massage: e.massage
        })
    }
});

valid_route.post('/successfulLogin', async (req, res) => {
    try {
        const user = req.user;

        const ord = req.body;
        const user_data = await Data.find({ _id: user });
        let updates_order = await Data.updateMany({ _id: user }, { $push: { "orders": ord } });
        res.status(200).json({
            status: "Success Full updates orders",
            massage: user_data
        })
    }
    catch (e) {
        res.status(401).json({
            status: 'Fail to upload orders in database!!',
            massage: e.massage
        })
    }
})

module.exports = valid_route;
