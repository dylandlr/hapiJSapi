const Hapi = require("@hapi/hapi");
const { Item } = require("./models/Item.js");
const { connectDB } = require("./db.js");

const server = Hapi.server({ port: 3000, host: "localhost" });

server.route([
  {
    method: "GET",
    path: "/items",
    handler: async () => {
      return await Item.find();
    },
  },
  {
    method: "GET",
    path: "/items/{id}",
    handler: async (request) => {
      const item = await Item.findById(request.params.id);
      if (!item) return { statusCode: 404, message: "Item not found" };
      return item;
    },
  },
  {
    method: "POST",
    path: "/items",
    handler: async (request, h) => {
      const newItem = new Item(request.payload);
      const saved = await newItem.save();
      return h.response(saved).code(201);
    },
  },
  {
    method: "PUT",
    path: "/items/{id}",
    handler: async (request) => {
      return await Item.findByIdAndUpdate(request.params.id, request.payload, {
        new: true,
      });
    },
  },
  {
    method: "DELETE",
    path: "/items/{id}",
    handler: async (request) => {
      await Item.findByIdAndDelete(request.params.id);
      return { statusCode: 204 };
    },
  },
]);

const init = async () => {
  try {
    await connectDB();
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

module.exports = { server, init };

if (require.main === module) {
  init().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}
