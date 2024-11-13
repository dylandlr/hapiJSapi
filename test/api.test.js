const chai = require("chai");
const chaiHttp = require("chai-http");
const { server, init } = require("../server.js");
const { Item } = require("../models/Item.js");
const mongoose = require("mongoose");

chai.use(chaiHttp);
const { expect } = chai;
const request = chai.request;

describe("Items API", () => {
  before(async function () {
    this.timeout(15000);
    try {
      await init();
      console.log("Test server and database initialized");
    } catch (err) {
      console.error("Setup error:", err);
      throw err;
    }
  });

  after(async function () {
    this.timeout(15000);
    try {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await server.stop();
      console.log("Cleanup completed");
    } catch (err) {
      console.error("Cleanup error:", err);
      throw err;
    }
  });

  beforeEach(async () => {
    await Item.deleteMany({});
  });

  describe("GET /items", () => {
    it("should get all items", async () => {
      const res = await request(server.listener).get("/items");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("POST /items", () => {
    it("should create a new item", async () => {
      const res = await request(server)
        .post("/items")
        .send({ name: "Sample Item", description: "Sample Description" });
      expect(res).to.have.status(201);
      expect(res.body).to.include({ name: "Sample Item" });
    });
  });
});
