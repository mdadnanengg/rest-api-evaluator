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

## 👉 View Live App: https://rest-api-evaluator.vercel.app/

## 📸 Screenshots
![Screenshot 2025-05-24 210218](https://github.com/user-attachments/assets/253edf72-9740-43a8-94ef-d38bacdb958d)
![Screenshot 2025-05-24 210350](https://github.com/user-attachments/assets/13825d19-ce6f-4281-b03a-49c7eb6d215f)
![Screenshot 2025-05-24 210421](https://github.com/user-attachments/assets/6c9088c2-3af3-41c2-91b1-ac1b9c3632b4)

## 🚀 Deployment Instructions

### 🔧 Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Git
- VS Code or any code editor

### 📁 Clone the Repository

```bash
git clone https://github.com/mdadnanengg/rest-api-evaluator.git
cd rest-api-evaluator


