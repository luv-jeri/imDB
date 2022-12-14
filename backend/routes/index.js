const express = require('express');
const authRoutes = require('./authentication.routes');
const router = express.Router();

router.use('/auth', authRoutes);

module.exports = router;
