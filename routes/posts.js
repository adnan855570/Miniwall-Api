const express = require("express");
const {
  createPost,
  getPosts,
  likePost,
  commentPost,
  updatePost,
  deletePost,
  createAudioPost,
  createVideoPost,
  createPostWithGeolocation,
} = require("../controllers/postController");
const auth = require("../middleware/auth"); // Import the auth middleware
const audioUpload = require("../middleware/audioUpload");
const videoUpload = require("../middleware/videoUpload");

const router = express.Router();

router.post("/", auth, createPost); // Adding auth middleware
router.get("/", auth, getPosts);
router.put("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentPost);
router.put("/:id", auth, updatePost); // Update a post
router.delete("/:id", auth, deletePost); // Delete a post
router.post("/audio", auth, audioUpload, createAudioPost);
router.post("/video", auth, videoUpload, createVideoPost);
router.post("/geolocation", auth, createPostWithGeolocation);

module.exports = router;
