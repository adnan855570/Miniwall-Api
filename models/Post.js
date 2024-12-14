const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Post title
    description: { type: String, required: true }, // Post description
    likes: { type: Number, default: 0 }, // Number of likes
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who commented
            text: { type: String, required: true }, // Comment text
            timestamp: { type: Date, default: Date.now }, // Timestamp of the comment
        },
    ],
    audio: { type: String }, // For audio posts
    video: { type: String }, // For video posts
    location: {
        latitude: { type: Number }, // Latitude for geolocation
        longitude: { type: Number }, // Longitude for geolocation
    },
    device: { type: String }, // Device type (e.g., browser and OS)
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the post owner
    timestamp: { type: Date, default: Date.now }, // Timestamp of the post creation
});

module.exports = mongoose.model('Post', PostSchema);
