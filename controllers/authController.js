const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserLanguage = async (req, res) => {
    try {
        const { preferredLanguage, country } = req.body;

        const user = await User.findById(req.user.id);
        user.preferredLanguage = preferredLanguage;
        user.country = country;

        await user.save();
        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateSocialMedia = async (req, res) => {
    try {
        const { facebook, instagram, tiktok, snapchat, whatsapp } = req.body;

        const user = await User.findById(req.user.id);
        user.socialMedia = { facebook, instagram, tiktok, snapchat, whatsapp };

        await user.save();
        res.status(200).json({ message: 'Social media updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
