# Task-1 - API CREATION (Events)
 Basically we want to perform CRUD operations on Events

# Tech Stack
- Node.js
- Express.js
- MongoDB (Native Driver)
- MongoDB Atlas 
- Postman

# Setup 
1. Install dependencies 
```
npm install
```
2. Create .env file using .env.example

3. start server
```
npm run dev
```
Server runs on:
http://localhost:3000

# API Endpoints
Create Event
POST /api/v3/app/events

Get Event by ID
GET /api/v3/app/events/:id

Get Events (Paginated)
GET /api/v3/app/events?limit=5&page=1

Update Event
PUT /api/v3/app/events/:id

Delete Event
DELETE /api/v3/app/events/:id

Sample Create Event Payload
{
  "type": "event",
  "uid": 18,
  "name": "Sample Event",
  "tagline": "This is a test event",
  "schedule": 1700000000,
  "description": "Event description",
  "moderator": 1,
  "category": "Tech",
  "subcategory": "AI",
  "rigor_rank": 5,
  "attendees": [12, 14, 18]
}

# API TESTING 
-all screenshot of api testing is available at 
postman-testing-screenshot folder


# Notes

- MongoDB native driver is used (no mongoose)
- No schema enforcement (schema-less design)
- _id is used as the unique identifier
- APIs are tested using Postman


