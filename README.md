# REST API Evaluator

## 📋 Overview

**REST API Evaluator** is a full-stack web application built using the MERN stack. It allows users to enter an OpenAPI Specification (OAS) file, parses it to extract all `GET` and `POST` endpoints, executes them using generated dummy inputs (for POST), and logs the results in a structured JSON format.

### 🔍 Key Features

- Parses an OAS (Swagger) URL to identify all `GET` and `POST` endpoints.
- Generates dummy inputs for `POST` requests.
- Executes endpoints using `Axios`.
- Logs all requests, responses, and status codes.
- Generates a summary report showing successful response frequencies.
- Handles and logs common errors (invalid OAS, unreachable endpoints, etc.).
- (Bonus) Web-based UI to display logs and success reports.

---

## 🚀 Deployment Instructions

### 🔧 Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Git
- VS Code or any code editor

### 📁 Clone the Repository

```bash
git clone https://github.com/yourusername/rest-api-evaluator.git
cd rest-api-evaluator
