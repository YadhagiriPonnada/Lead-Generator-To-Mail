const express = require('express');
const router = express.Router();
const { createLead } = require('../controllers/leadController');
const { validateLead } = require('../middleware/validateLead');

router.post('/leads', validateLead, createLead);

module.exports = router; 