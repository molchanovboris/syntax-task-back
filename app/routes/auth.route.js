// Fixed заменил let на const
const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/login', authController.login);
router.get('/checkAuth', authMiddleware.checkAuth, authController.checkAuth);

module.exports = router;
