const mongoose = require("mongoose");
const assert = require("assert");
const UrlObject = require("../src/models");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => {
  console.warn("Error : ", error);
});
beforeEach((done) => {
  obj = new UrlObject({
    originalUrl: "google.com",
    hash: "abc123",
    shortenedUrl: "http://localhost:3000/abc123",
  });
  obj.save().then(() => done());
});

describe("DB Creates", () => {
  it("creates a url object", (done) => {
    const newEntry = new UrlObject({
      originalUrl: "twitter.com",
      hash: "foobar123",
      shortenedUrl: "http://localhost:3000/foobar123",
    });
    newEntry.save().then(() => {
      assert(!newEntry.isNew);
      done();
    });
  });
});

describe("DB Retrieves", () => {
  it("finds entry with the original url of google.com", (done) => {
    UrlObject.findOne({ originalUrl: "google.com" }).then((resp) => {
      assert(resp.hash === "abc123");
      done();
    });
  });
});
