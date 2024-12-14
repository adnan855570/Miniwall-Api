const Post = require('../models/Post');
const useragent = require('useragent');
const mongoose = require('mongoose');

exports.createPost = async (req, res) => {
    const { title, description } = req.body;

    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const post = new Post({
            title,
            description,
            owner: req.user.id, // Using `req.user.id` from the JWT payload
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ likes: -1, timestamp: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.likes++;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.commentPost = async (req, res) => {
    const { text } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.comments.push({ text, timestamp: new Date() });
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Ensure the user owns the post
        if (!post || post.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to update this post' });
        }

        const { title, description } = req.body;

        // Update fields
        if (title) post.title = title;
        if (description) post.description = description;

        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a Post
exports.deletePost = async (req, res) => {
    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid post ID format' });
        }

        const post = await Post.findById(req.params.id);

        // Ensure the post exists
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check ownership
        console.log('Post Owner:', post.owner.toString());
        console.log('Token User ID:', req.user.id);

        if (post.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to delete this post' });
        }

        // Delete post directly
        await Post.findByIdAndDelete(req.params.id); // Use this instead of remove()
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error('Error deleting post:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.createAudioPost = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Ensure audio file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Audio file is required' });
        }

        const audioPath = req.file.path; // Get the uploaded file path

        const post = new Post({
            title,
            description,
            audio: audioPath,
            owner: req.user.id,
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createVideoPost = async (req, res) => {
    try {
        console.log('File:', req.file); // Log the uploaded file
        console.log('Body:', req.body); // Log other form data

        if (!req.file) {
            return res.status(400).json({ error: 'Video file is required' });
        }

        const { title, description } = req.body;
        const videoPath = req.file.path;

        const post = new Post({
            title,
            description,
            video: videoPath,
            owner: req.user.id,
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error('Error uploading video:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.createPostWithGeolocation = async (req, res) => {
    try {
        const { title, description, latitude, longitude } = req.body;

        const agent = useragent.parse(req.headers['user-agent']); // Detect device
        const device = `${agent.family} ${agent.os}`; // Format device type

        const post = new Post({
            title,
            description,
            owner: req.user.id,
            location: {
                latitude,
                longitude,
            },
            device,
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};