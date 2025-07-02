# Minutes of Meeting Extractor

A Node.js & TypeScript backend service that extracts structured summaries, decisions, and action items from raw meeting notes using OpenAI GPT.  
Built with Express.js, Zod, and @ai-sdk/openai, it demonstrates clean architecture, type safety, and maintainability.

---

## Technologies

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Zod](https://img.shields.io/badge/Zod-0B7285?style=for-the-badge)
![Multer](https://img.shields.io/badge/Multer-FF6C37?style=for-the-badge)
![Dotenv](https://img.shields.io/badge/Dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)

---

## Table of Contents
- [About the Project](#️-about-the-project)
- [Features](#-features)
- [Tech Stack Used](#-tech-stack-used)
- [How to Setup](#-how-to-setup)
- [How to Test](#-how-to-test)
- [Project Structure](#-project-structure)
- [API Endpoint](#-api-endpoint)
- [Detailed Test Cases](#-detailed-test-cases)
- [Contributing](#️-contributing)

---

## About the Project

> This service helps teams by transforming unstructured meeting notes into structured JSON that includes:
> - Concise summaries
> - Key decisions
> - Action items with task, optional owner, and optional due date  
>
> Designed for clarity, maintainability, and robust error handling.

---

## Features
- Accepts raw meeting notes via request body or `.txt` file upload
- Calls OpenAI (via @ai-sdk/openai) to extract:
  - Summary (2–3 sentences)
  - List of decisions
  - Structured action items
- JSON API response with unified format
- Input validation with Zod
- Rate limiting per IP (5 requests per minute)
- Clear, consistent logging for debugging
- Modular & type-safe project structure

---

## Tech Stack Used
- Node.js
- TypeScript
- Express.js
- @ai-sdk/openai (for structured AI response)
- Multer (for file upload)
- Zod (for validation & schema)
- dotenv (environment config)

---

## How to Setup

> **Before you begin:** Ensure you have Node.js (v16+) & npm installed.

1. **Clone the repository:**
```bash
git clone <repository-url>
cd meeting-minutes-extractor
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create and setup .env file:**
```bash
PORT=5000
OPENAI_API_KEY=your_openai_key_here
```

4. **Run in development:**
```bash
npm run dev
```
> Server should run at: `http://localhost:5000`

---

## How to Test
**Use Postman to test the API using these two methods:**
1. Upload .txt file → form-data key: `file`
- Download this file
- Postman image
- Response:
```json
{
    "status": "success",
    "msg": "Meeting notes processed successfully",
    "data": {
        "summary": "The meeting focused on finalizing the product launch date, assigning tasks for release preparation, and planning user engagement strategies.",
        "decisions": [
            "Product launch confirmed for August 5.",
            "Agreed to organize an internal demo on July 28."
        ],
        "actionItems": [
            {
                "task": "Prepare release notes",
                "owner": "Anil",
                "due": "July 25"
            },
            {
                "task": "Coordinate user testing with a focus on performance metrics",
                "owner": "Neha"
            },
            {
                "task": "Draft FAQ page content",
                "owner": "Priya",
                "due": "July 22"
            },
            {
                "task": "Propose a social media teaser campaign",
                "owner": "Marketing team",
                "due": "July 18"
            }
        ]
    },
    "error": null
}
```

2. Send raw text → JSON body: `{ "text": "..." }`
- Copy text data from this file
- Postman image
- Response:
```json
{
    "status": "success",
    "msg": "Meeting notes processed successfully",
    "data": {
        "summary": "The team finalized the product launch date for July 20 and discussed key tasks related to the launch, including brand consistency, marketing plans, and mobile interface optimization. They also scheduled a review of beta testing results for July 15.",
        "decisions": [
            "Finalize product launch date for July 20",
            "Prioritize optimizing the mobile interface based on user feedback",
            "Schedule next review of beta testing results for July 15"
        ],
        "actionItems": [
            {
                "task": "Coordinate with the design team to ensure brand consistency",
                "owner": "Rakesh"
            },
            {
                "task": "Finalize and deliver the marketing plan",
                "owner": "Pooja",
                "due": "July 10"
            },
            {
                "task": "Draft the first version of training materials for customer support teams",
                "owner": "Raj",
                "due": "July 12"
            }
        ]
    },
    "error": null
}
```
---

## Project Structure

```plaintext
src/
├── controllers/         → Route handlers
├── routes/              → API routes
├── schema/              → Zod schemas
├── services/            → Business logic & AI calls
├── types/               → TypeScript types & interfaces
├── utils/               → Helpers (e.g., rate limiter)
├── index.ts             → App entry point
uploads/                 → Temporary uploaded files
.env                     → Environment config
```

---

## API Endpoint

| Method | Endpoint                | Description                                                               |
|-------|-------------------------|---------------------------------------------------------------------------|
| GET | `/health` | To check server is up and running |
| POST  | `/api/meeting/process`  | Extract summary, decisions, and action items from raw text or uploaded `.txt` file |


---

## Test Cases
