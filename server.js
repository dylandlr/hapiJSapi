const Hapi = require("@hapi/hapi");
const { Item } = require("./models/Item.js");
const { connectDB } = require("./db.js");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
  routes: {
    cors: true,
  },
  address: "127.0.0.1",
});

const init = async () => {
  try {
    await connectDB();

    console.log("Registering routes...");

    server.route([
      {
        method: "GET",
        path: "/items",
        handler: async (request, h) => {
          try {
            console.log("GET /items - Attempting to fetch items");
            const items = await Item.find();
            console.log("GET /items - Found items:", items);
            return h.response(items).code(200);
          } catch (error) {
            console.error("GET /items - Error:", error);
            throw error;
          }
        },
      },
      {
        method: "POST",
        path: "/items",
        handler: async (request, h) => {
          try {
            console.log("POST /items - Received payload:", request.payload);
            const newItem = new Item(request.payload);
            const saved = await newItem.save();
            console.log("POST /items - Saved item:", saved);
            return h.response(saved).code(201);
          } catch (error) {
            console.error("POST /items - Error:", error);
            throw error;
          }
        },
      },
      {
        method: "GET",
        path: "/items/{id}",
        handler: async (request, h) => {
          try {
            console.log(
              `GET /items/${request.params.id} - Attempting to fetch item`
            );
            const item = await Item.findById(request.params.id);
            if (!item) {
              return h.response({ message: "Item not found" }).code(404);
            }
            console.log(`GET /items/${request.params.id} - Found item:`, item);
            return h.response(item).code(200);
          } catch (error) {
            console.error(`GET /items/${request.params.id} - Error:`, error);
            throw error;
          }
        },
      },
      {
        method: "PUT",
        path: "/items/{id}",
        handler: async (request, h) => {
          try {
            console.log(
              `PUT /items/${request.params.id} - Attempting to update item`
            );
            const item = await Item.findByIdAndUpdate(
              request.params.id,
              request.payload,
              { new: true }
            );
            if (!item) {
              return h.response({ message: "Item not found" }).code(404);
            }
            console.log(
              `PUT /items/${request.params.id} - Updated item:`,
              item
            );
            return h.response(item).code(200);
          } catch (error) {
            console.error(`PUT /items/${request.params.id} - Error:`, error);
            throw error;
          }
        },
      },
      {
        method: "DELETE",
        path: "/items/{id}",
        handler: async (request, h) => {
          try {
            console.log(
              `DELETE /items/${request.params.id} - Attempting to delete item`
            );
            const item = await Item.findByIdAndDelete(request.params.id);
            if (!item) {
              return h.response({ message: "Item not found" }).code(404);
            }
            console.log(
              `DELETE /items/${request.params.id} - Deleted item:`,
              item
            );
            return h.response().code(204);
          } catch (error) {
            console.error(`DELETE /items/${request.params.id} - Error:`, error);
            throw error;
          }
        },
      },
    ]);

    console.log(
      "Routes registered:",
      server.table().map((route) => ({
        method: route.method,
        path: route.path,
      }))
    );

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
  } catch (err) {
    console.error("Failed to start server:", err);
    throw err;
  }
};

module.exports = { server, init };

if (require.main === module) {
  init().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}
