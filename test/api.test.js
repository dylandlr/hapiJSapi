const chai = require("chai");
const chaiHttp = require("chai-http");
const { server, init } = require("../server.js");
const { Item } = require("../models/Item.js");
const mongoose = require("mongoose");

chai.use(chaiHttp);
const { expect } = chai;
const request = chai.request;

describe("Items API", () => {
  let testServer;

  before(async function () {
    this.timeout(15000);
    try {
      if (server.info.started !== 0) {
        await server.stop();
      }
      testServer = await init();
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
      const testItem = new Item({
        name: "Test Item",
        description: "Test Description",
      });
      await testItem.save();

      const res = await request(testServer.listener).get("/items");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(1);
    });
  });

  describe("POST /items", () => {
    it("should create a new item", async () => {
      const res = await request(testServer.listener)
        .post("/items")
        .send({ name: "Sample Item", description: "Sample Description" });
      expect(res).to.have.status(201);
      expect(res.body).to.include({ name: "Sample Item" });
    });
  });

  describe("GET /items/:id", () => {
    it("should get a specific item by ID", async () => {
      const testItem = new Item({
        name: "Test Item",
        description: "Test Description",
      });
      const savedItem = await testItem.save();

      const res = await request(testServer.listener).get(
        `/items/${savedItem._id}`
      );
      expect(res).to.have.status(200);
      expect(res.body).to.include({ name: "Test Item" });
    });

    it("should return 404 for non-existent item", async () => {
      const res = await request(testServer.listener).get(
        `/items/654321654321654321654321`
      );
      expect(res).to.have.status(404);
    });
  });

  describe("PUT /items/:id", () => {
    it("should update an existing item", async () => {
      const testItem = new Item({
        name: "Test Item",
        description: "Test Description",
      });
      const savedItem = await testItem.save();

      const res = await request(testServer.listener)
        .put(`/items/${savedItem._id}`)
        .send({ name: "Updated Item", description: "Updated Description" });
      expect(res).to.have.status(200);
      expect(res.body).to.include({ name: "Updated Item" });
    });
  });

  describe("DELETE /items/:id", () => {
    it("should delete an existing item", async () => {
      const testItem = new Item({
        name: "Test Item",
        description: "Test Description",
      });
      const savedItem = await testItem.save();

      const res = await request(testServer.listener).delete(
        `/items/${savedItem._id}`
      );
      expect(res).to.have.status(204);

      const deletedItem = await Item.findById(savedItem._id);
      expect(deletedItem).to.be.null;
    });
  });
});
