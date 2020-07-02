const express = require("express");
const bodyParser = require("body-parser");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();
const app = express();

const port = 8000;

app.use(bodyParser.json());
require("../src/routes")(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

describe("Routes", () => {
  it("should return error for empty params", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("should create a new short url", (done) => {
    chai
      .request(app)
      .post("/shorten")
      .set("Content-Type", "application/json")
      .send({ originalUrl: "google.com" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.url.originalUrl.should.equal("http://google.com");
        done();
      });
  });

  it("should get url", (done) => {
    const hash = "rFx4r16uby"; // hash of existing object
    chai
      .request(app)
      .get(`/${hash}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.url.originalUrl.should.equal("http://example.com");
        res.body.url.hash.should.equal("rFx4r16uby");
        res.body.url.shortenedUrl.should.equal(
          "http://localhost:3000/rFx4r16uby"
        );
        done();
      });
  });
});
