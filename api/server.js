const express = require("express");

const PostRouter = require("../posts/post-router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", PostRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Error retrieving the data from Server"
  });
})

module.exports = server;
