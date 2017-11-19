const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const apiRouter = express.Router();

apiRouter.use(bodyParser.json());

apiRouter.route('/')
    .get((req, res, next) => {
        console.log("Hello");
        res.send("Hello");
    });


module.exports = apiRouter;