const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');

router.post('/contact', validateContact, submitContact);

module.exports = router;
