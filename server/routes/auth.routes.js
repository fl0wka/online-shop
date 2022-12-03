const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router({ mergeParams: true });

router.post('/signUp', async (req, res) => {});
router.post('/signIn', async (req, res) => {});
router.post('/token', async (req, res) => {});

module.exports = router;
