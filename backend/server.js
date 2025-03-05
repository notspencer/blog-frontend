import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON
app.use(cors()); // Allow frontend requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Post Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// API Route to Create a Post
app.post("/api/posts", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
