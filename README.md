# AI Study Assistant

A small React application that uses Google Gemini to transform a user's free-form study topic into an interactive set of flashcards.

The project demonstrates a complete frontend-to-backend AI workflow, including structured AI output, response validation, error handling, request timeout handling, and protection against stale AI responses.

## Live Demo

**Frontend:**  
https://flam-study-assistant-three.vercel.app

**Backend API:**  
https://flam-study-assistant-wg5k.onrender.com

**GitHub Repository:**  
https://github.com/PradeepChintala2005/flam-study-assistant

---

## Features

- Enter any study topic using free-form text
- Generate AI-powered flashcards using Google Gemini
- Generate exactly 5 flashcards for each topic
- Receive structured JSON from the AI
- Validate the AI response before displaying it
- Show and hide flashcard answers
- Navigate between flashcards
- Display current card progress
- Previous and Next navigation
- Loading state while generating flashcards
- Empty input validation
- Backend/API error handling
- Invalid AI response handling
- Request timeout handling
- Protection against stale AI responses
- Responsive UI for smaller screens
- API key kept securely on the backend

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express
- CORS
- dotenv

### AI

- Google Gemini API
- `@google/genai`

### Deployment

- Vercel - Frontend
- Render - Backend

---

## Application Architecture

The application follows this flow:

```text
User
  |
  | Enter study topic
  v
React Frontend
  |
  | POST /api/generate
  v
Express Backend
  |
  | Prompt
  v
Google Gemini API
  |
  | Structured JSON
  v
Express Backend
  |
  | AI result
  v
React Frontend
  |
  | Parse + Validate
  v
Interactive Flashcard Deck