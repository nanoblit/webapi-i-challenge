const express = require("express");
const db = require("./data/db");
const server = express();

server.use(express.json());

server.post("/api/users", (req, res) => {
  const { body } = req;
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert
      .then(data => res.status(200).json(data))
      .catch(error =>
        res
          .status(500)
          .json({
            error: "There was an error while saving the user to the database"
          })
      );
  }
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(data => {
      console.log("happy");
      res.json(data);
    })
    .catch(error => {
      console.log("sad");
      res.json(error);
    });
});

server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(data => {
      if (!data) res.json("Wrong id");
      else res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
});

server.delete("/api/users/:id", (req, res) => {
  res.json("delete a hub by id using req.body");
});

server.put("/api/users/:id", (req, res) => {
  res.json("update a hub by id using req.params.id");
});

server.listen(3000, () => {
  console.log("listening on 3000");
});
