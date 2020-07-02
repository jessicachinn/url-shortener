const mongoose = require("mongoose");
const urlObject = mongoose.model("url");

module.exports = (app) => {
  app.post("/shorten", async (req, res) => {
    const originalUrl = req.body.originalUrl;
    let hash = generateHash();

    function generateHash() {
      const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";
      for (var i = 0; i < 10; i++)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }

    let formattedUrl = originalUrl;
    if (!/^https?:\/\//i.test(originalUrl)) {
      formattedUrl = "http://" + originalUrl;
    }

    const newEntry = {
      originalUrl: formattedUrl,
      hash: hash,
      shortenedUrl: "http://localhost:3000/" + hash,
    };

    const createdObject = new urlObject(newEntry);

    createdObject.save((error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send({
          url: newEntry,
        });
      }
    });
  });

  app.get("/:hash", async (req, res) => {
    const defaultEntry = {
      originalUrl: "http://localhost:3000/",
      hash: "",
      shortenedUrl: "http://localhost:3000/",
    };
    const urlHash = req.params.hash;
    urlObject.findOne({ hash: urlHash }, (error, entry) => {
      if (error || !entry) {
        res.status(404).send({
          url: defaultEntry,
        });
      } else {
        res.status(200).send({
          url: entry,
        });
      }
    });
  });
};
