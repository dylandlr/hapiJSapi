# Hapi.js API with MongoDB and Mocha Testing

A simple RESTful API built with Hapi.js, MongoDB, and Mongoose, with Mocha/Chai testing.

### Project Structure

```
a4/
├── models
│   └── Item.js       # MongoDB schema
├── test
│   └── api.test.js   # Mocha tests for API
├── db.js             # MongoDB connection
├── server.js         # Hapi.js API server
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

To run the tests, use:

```bash
npm test
```

This will run all Mocha tests in the `test` directory.

## API Documentation

### Endpoints

1. **`GET /items`** - Retrieve all items

   - **Method**: GET
   - **URL**: `/items`
   - **Response**: Array of items
   - **Status Code**: 200
   - **Response Body**:
     ```json
     [
       {
         "_id": "string",
         "name": "string",
         "description": "string"
       }
     ]
     ```

2. **`GET /items/{id}`** - Retrieve a specific item

   - **Method**: GET
   - **URL**: `/items/{id}`
   - **Parameters**:
     - `id` (path parameter) - MongoDB ObjectId of the item
   - **Success Response**:
     - **Code**: 200
     - **Content**: Single item object
   - **Error Response**:
     - **Code**: 404
     - **Content**: `{ "message": "Item not found" }`
   - **Response Body**:
     ```json
     {
       "_id": "string",
       "name": "string",
       "description": "string"
     }
     ```

3. **`POST /items`** - Create a new item

   - **Method**: POST
   - **URL**: `/items`
   - **Body**:
     ```json
     {
       "name": "string",
       "description": "string"
     }
     ```
   - **Success Response**:
     - **Code**: 201
     - **Content**: Created item object
   - **Response Body**:
     ```json
     {
       "_id": "string",
       "name": "string",
       "description": "string"
     }
     ```

4. **`PUT /items/{id}`** - Update an existing item

   - **Method**: PUT
   - **URL**: `/items/{id}`
   - **Parameters**:
     - `id` (path parameter) - MongoDB ObjectId of the item
   - **Body**:
     ```json
     {
       "name": "string",
       "description": "string"
     }
     ```
   - **Success Response**:
     - **Code**: 200
     - **Content**: Updated item object
   - **Error Response**:
     - **Code**: 404
     - **Content**: `{ "message": "Item not found" }`

5. **`DELETE /items/{id}`** - Delete an item
   - **Method**: DELETE
   - **URL**: `/items/{id}`
   - **Parameters**:
     - `id` (path parameter) - MongoDB ObjectId of the item
   - **Success Response**:
     - **Code**: 204
     - **Content**: No content
   - **Error Response**:
     - **Code**: 404
     - **Content**: `{ "message": "Item not found" }`

### Error Responses

All endpoints may return the following errors:

- **400 Bad Request**: When the request body or parameters are invalid
- **404 Not Found**: When the requested resource doesn't exist
- **500 Internal Server Error**: When an unexpected error occurs

Error response format:

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Item not found"
}
```

### Prerequisites

- MongoDB must be running
- Test database will be created automatically
- Environment should be set to `test`
- Dependencies should be installed

```bash
$ npm install mocha chai mongoose chai-http @hapi/code @hapi/hapi
```

### Writing Tests

Tests are located in `/test` directory. Follow these conventions:

- One test file per route
- Use descriptive test names
- Clean up test data after each test

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License (c) 2024
