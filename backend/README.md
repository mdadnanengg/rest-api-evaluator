# Backend - Node.js + Express

## Overview

This is the backend for the REST API Evaluator application. It accepts an OpenAPI Specification (OAS) URL, parses the API definitions, executes GET and POST requests using Axios with dummy data, and logs the results in JSON format.

## Features

* Accept OAS URL.
* Parse GET and POST endpoints.
* Generate dummy POST request bodies.
* Execute API calls with Axios.
* Return detailed logs and summary reports.
* Handles different HTTP status codes including 200, 404, 415, 500, etc.

## Setup Instructions

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Assumptions

* Only GET and POST endpoints are supported.
* Dummy data for POST requests is generated from the schema defined in the OAS (fallback to static if undefined).
* Logs and reports are kept in-memory (can be extended to database).
* Failed requests log proper messages (e.g., 415 Unsupported Media Type, 404 Not Found, etc.)

## Endpoints

### POST `/api/evaluate`

**Body:**

```json
{
  "oasUrl": "https://petstore.swagger.io/v2/swagger.json"
}
```

**Response:**

* `logs`: Array of request/response objects
* `summary`: Object with success percentages per endpoint

---

## Notes

* Axios is used for making API requests instead of cURL for better Node.js integration.
* Error handling includes invalid URLs, invalid OAS, and failed HTTP requests.
* Status codes like 415 and 500 are shown with reason messages in logs for debugging.
