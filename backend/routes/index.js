const express = require('express');
const authRoutes = require('./authentication.routes');
const movieRoutes = require('./movies.routes');
const reviewRoutes = require('./review.routes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);
router.use('/review', reviewRoutes);


module.exports = router;
