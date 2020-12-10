const express = require('express');
const { initalData } = require('../../controllers/admin/initalData');
const router = express.Router();


router.post('/initialdata' , initalData );

module.exports = router;