## API Documentation – Nudge Creation
# Step 1 Nudge Object (Conceptual Data Model)
The following represents the conceptual data model for a Nudge.
This is an API-level contract and not a database schema.
```
{
  "id": "ObjectId",
  "title": "string",
  "description": "string",
  "cover_image_url": "string",
  "icon": "string",
  "cta_text": "string",

  "linked_type": "event | article",
  "linked_id": "ObjectId",

  "schedule_date": "YYYY-MM-DD",
  "start_time": "HH:mm",
  "end_time": "HH:mm",

  "status": "draft | published",

  "created_at": "timestamp",
  "updated_at": "timestamp"
}

```

# Each field Description
- id → Unique identifier for the nudge
- title → Short heading shown to the user (max 60 chars)
- description → Full description of the nudge
- cover_image_url → Image shown as the nudge cover
- icon → Icon shown when nudge is minimized
- cta_text → One-line invitation text (example: “Swipe right to check it out”)
- linked_type → Specifies whether nudge is related to an event or article
- linked_id → ID of the related event or article
- schedule_date / start_time / end_time → Controls when the nudge is shown
- status → Draft nudges are not visible; published nudges are active
- created_at / updated_at → Tracking and auditing


# Step 2 CRUD API Documentation for Nudge
Base Url
```
/api/v3/app/nudges
```

1. Create Nudge
Endpoint
```
POST /api/v3/app/nudges
```
Description
Creates a new nudge in draft or published state.

Request Body:
```
{
  "title": "Join AI Meetup",
  "description": "An exclusive AI networking event",
  "cover_image_url": "https://image.url/banner.png",
  "icon": "calendar",
  "cta_text": "Register now",
  "linked_type": "event",
  "linked_id": "64fa123abc456",
  "schedule_date": "2026-01-15",
  "start_time": "10:00",
  "end_time": "12:00",
  "status": "draft"
}

```
Success Response:
```
{
  "id": "65ab789xyz123",
  "message": "Nudge created successfully"
}
```
Error Responses:
- 400 -> Invalid request payload
- 500 -> Internal server error

2. Get Nudge by ID
Endpoint
```
GET /api/v3/app/nudges/:id
```
Description
Fetches a single nudge by its ID.

Success Response:
```
{
  "id": "65ab789xyz123",
  "title": "Join AI Meetup",
  "description": "An exclusive AI networking event",
  "status": "published"
}

```
Error Responses:
- 400 -> Invalid request payload
- 500 -> Internal server error

3. Get Nudges (List)
Endpoint
```
GET /api/v3/app/nudges?linked_type=event&linked_id=64fa123abc456
```
Description
Fetches a list of nudges, optionally filtered by linked event or article.

Success Response:
```
{
  "count": 2,
  "data": [
    {
      "id": "65ab789xyz123",
      "title": "Join AI Meetup",
      "status": "published"
    }
  ]
}

```
Error Responses:
- 400 -> Invalid request payload
- 500 -> Internal server error

4. Update Nudge
Endpoint
```
PUT /api/v3/app/nudges/:id
```
Description
Updates an existing nudge.

Request Body:
```
{
  "title": "Updated AI Meetup",
  "status": "published"
}

```
Success Response:
```
{
  "message": "Nudge updated successfully"
}

```
Error Responses:
- 400 -> Invalid request payload
- 404 -> Nudge not found

5. Delete Nudge
Endpoint
```
DELETE /api/v3/app/nudges/:id

```
Description
Deletes a nudge permanently.

Success Response:
```
{
  "message": "Nudge deleted successfully"
}

```
Error Responses:
- 404 -> Nudge not found

# Step 3: Backend Flow Explanation (Nudge Creation)
This section explains how the frontend and backend interact for the Nudge Creation feature and how the overall flow works.

## 1. Nudge Creation Flow

1. The frontend displays the Nudge Creation form using the provided UI wireframe.
2. User fills in details such as title, description, image, icon, CTA text, linked event/article, and schedule.
3. On clicking **Save as Draft** or **Publish**, the frontend sends a request to:
POST /api/v3/app/nudges
4. The backend validates the request payload and stores the nudge data.
5. If the status is `draft`, the nudge is saved but not visible to users.
6. If the status is `published`, the nudge becomes active and eligible to be shown to users based on schedule.

## 2. Nudge Scheduling Flow

1. Each nudge contains `schedule_date`, `start_time`, and `end_time`.
2. The backend uses this information to determine when the nudge should be active.
3. Nudges are only fetched and displayed to users during their scheduled time window.
4. Outside the scheduled time, nudges are ignored or hidden.

## 3. Fetching Nudges

1. The frontend requests nudges using:
GET /api/v3/app/nudges
2. Filters such as `linked_type` and `linked_id` are used to fetch nudges related to a specific event or article.
3. The backend returns a list of nudges that are:
- Published
- Within the active schedule window

## 4. Updating a Nudge

1. When a user edits a nudge, the frontend sends updated fields to:
PUT /api/v3/app/nudges/:id
2. The backend updates only the provided fields.
3. Status can be changed from `draft` to `published` during update.

## 5. Deleting a Nudge

1. When a nudge is no longer required, the frontend calls:
DELETE /api/v3/app/nudges/:id
2. The backend removes the nudge permanently.
3. Deleted nudges are no longer available for fetching or display.

## 6. Minimized and Expanded Nudge Display

- The backend provides all required fields (icon, title, CTA text, image).
- Frontend decides whether to display the nudge in minimized or expanded view.
- Backend remains UI-agnostic and only serves data.

## Summary

- Frontend handles UI and user interaction.
- Backend manages data storage, scheduling, and retrieval.
- APIs are designed to be scalable, versioned, and reusable.
- This separation ensures clean architecture and maintainability.