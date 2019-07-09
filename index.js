const express = require("express");
const db = require("./data/db");
const server = express();

server.use(express.json());

server.post("/api/users", (req, res) => {
  const { body } = req;
  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(body)
      .then(data => res.status(201).json(data))
      .catch(error =>
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        })
      );
  }
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(data => {
      if (!data)
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      else res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then(data => {
      if (!data)
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      else res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { body, params } = req;
  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.update(params.id, body)
      .then(data => {
        if (!data)
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        else res.status(200).json(data);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

server.listen(3000, () => {
  console.log("listening on 3000");
});
