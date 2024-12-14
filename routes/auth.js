const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { updateUserLanguage, updateSocialMedia } = require('../controllers/authController'); // Import the function
const auth = require('../middleware/auth'); // Import the auth middleware
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/settings/language', auth, updateUserLanguage);
router.put('/settings/social-media', auth, updateSocialMedia);

module.exports = router;
