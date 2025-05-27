# Lead Processing API

A Node.js + Express backend service that processes leads, stores them in MongoDB, and forwards them to n8n for email notifications.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally)
- n8n webhook URL

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/leadsDB
N8N_WEBHOOK_URL=https://yadhagiri.app.n8n.cloud/webhook/leads
PORT=3000
```

3. Make sure MongoDB is running locally

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoint

### POST /api/leads

Creates a new lead and forwards it to n8n.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "message": "Let's connect"
}
```

**Required Fields:**
- name
- email

**Optional Fields:**
- company
- message

**Success Response:**
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Inc",
    "message": "Let's connect",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "_id": "..."
  }
}
```

## Error Handling

The API includes validation for:
- Required fields
- Email format
- MongoDB connection issues
- n8n webhook failures (graceful handling) 