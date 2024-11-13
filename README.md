---

## README

# Hapi.js API with MongoDB and Mocha Testing

A simple RESTful API built with Hapi.js, MongoDB, and Mongoose, with Mocha/Chai testing.

### Project Structure

```
.
├── models
│   └── Item.js       # Mongoose schema for items
├── test
│   └── api.test.js   # Mocha tests for API endpoints
├── db.js             # MongoDB connection setup
├── server.js         # Hapi.js API server with CRUD routes
└── README.md         # Documentation
```

## Requirements

- Node.js
- MongoDB
- Hapi.js
- Mocha and Chai for testing

## Environment Variables

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/itemsdb
NODE_ENV=development
```

Create a `.env` file in the root directory with these variables.

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hapi-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. MongoDB Setup

Ensure MongoDB is running on your machine. The default URI is set to `mongodb://localhost:27017/itemsdb` in `db.js`. Change this URI if needed.

### 4. Run the Server

```bash
node server.js
```

The server should be running on `http://localhost:3000`.

### 5. Run Tests

#To run the tests, use:

```bash
npm test
```

This will run all Mocha tests in the `test` directory.
---

## API Documentation

### Endpoints

1. **`GET /items`** - Retrieve all items.

   - **Response**: Returns an array of all items.
   - **Status Code**: 200

2. **`GET /items/{id}`** - Retrieve an item by ID.

   - **Params**: `id` - ID of the item to retrieve.
   - **Response**: Returns the item if it exists.
   - **Status Codes**:
     - 200: Success
     - 404: Item not found

3. **`POST /items`** - Create a new item.

   - **Body**:
     ```json
     {
       "name": "string",
       "description": "string"
     }
     ```
   - **Response**: The created item.
   - **Status Code**: 201

4. **`PUT /items/{id}`** - Update an existing item.

   - **Params**: `id` - ID of the item to update.
   - **Body**:
     ```json
     {
       "name": "string",
       "description": "string"
     }
     ```
   - **Response**: The updated item.
   - **Status Code**: 200

5. **`DELETE /items/{id}`** - Delete an item by ID.
   - **Params**: `id` - ID of the item to delete.
   - **Status Code**: 204

---

## Error Handling

The API implements standard HTTP error codes:

- `400` - Bad Request (invalid input)
- `404` - Resource Not Found
- `500` - Internal Server Error

Errors are returned in the following format:

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Item not found"
}
```

---

## Testing

### Prerequisites

- MongoDB must be running
- Test database will be created automatically
- Environment should be set to `test`

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

### Writing Tests

Tests are located in `/test` directory. Follow these conventions:

- One test file per route
- Use descriptive test names
- Clean up test data after each test

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## License

MIT

---
