const express = require('express');

const authController = require('../../controllers/auth.controller');

const router = express.Router();

const auth = require('../../middlewares/auth');

router.post('/signup',authController.signupAdmin)