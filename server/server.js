import express from "express";
import connect from "./database/conn.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8000;

import Post from "./model/post.model.js";

app.get("/", (req, res) => {
  try {
    Post.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(408).json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
});

app.post("/uploads", async (req, res) => {
  const body = req.body;
  try {
    const newImage = await Post.create(body);
    newImage.save();
    res.status(201).json({ msg: "New image uploaded...!" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Can't connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database Connection...!");
  });
