# Frontend - React App

## Overview

This is the frontend for the REST API Evaluator application, built with React. It allows users to upload an OpenAPI Specification (OAS) URL, view the parsed endpoints, execute the API calls, and visualize logs and summary reports.

## Features

* Upload Swagger OAS URL.
* Parse and display GET and POST endpoints.
* Trigger evaluation of endpoints.
* View logs and response summaries with a success/failure chart.
* View total endpoints, success rate, count of successes and failures.
* Detailed request/response log section.

## Setup Instructions

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm start
```

The app will run at `http://localhost:3000`

## Assumptions

* Backend is hosted at `http://localhost:5000`
* Only GET and POST methods are considered.
* Swagger URL should return a valid OAS 2.0 JSON document.
* Chart displays endpoint success/failure visually using bar graph.
* Log section allows viewing detailed input/output for each request.