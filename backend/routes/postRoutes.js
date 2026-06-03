const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { username, text, image } = req.body;
    if (!text && !image) {
  return res.status(400).json({
    message: "Text or image is required",
  });
}

    const post = await Post.create({
      username,
      text,
      image,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.put("/like/:id", async (req, res) => {
  try {
    const { username } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!post.likes.includes(username)) {
      post.likes.push(username);
      await post.save();
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.put("/comment/:id", async (req, res) => {
  try {
    const { username, text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      username,
      text,
    });

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;