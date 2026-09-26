# AI Study Assistant

A small React application that uses an LLM to turn a user's study topic into interactive flashcards.

## Features

- Enter any study topic in free-form text
- Generate structured flashcards using Gemini
- Validate the AI response before displaying it
- Show and hide flashcard answers
- Navigate between flashcards
- Loading state while generating
- Error handling for failed requests
- Protection against stale AI responses
- Responsive UI for smaller screens

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

## Project Structure

FLAM/
│
├── src/
│   ├── components/
│   │   └── FlashcardDeck.jsx
│   │
│   ├── lib/
│   │   └── validateResult.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── server/
│   ├── server.js
│   ├── .env
│   └── .env.example
│
└── README.md