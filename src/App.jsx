import { parseAndValidateResult } from "./lib/validateResult";
import { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");

  const handleGenerate = async () => {
  if (!topic.trim()) {
    alert("Please enter a topic");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: topic,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend error:", data);
      return;
    }

    const result = parseAndValidateResult(data.result);

    if (!result) {
      console.error("Invalid AI response");
      return;
    }

    console.log("Validated result:", result);
  } catch (error) {
    console.error("Request failed:", error);
  }
};
  return (
    <div className="app">
      <header className="header">
        <h1>AI Study Assistant</h1>
        <p>Turn any topic into interactive flashcards</p>
      </header>

      <main className="container">
        <section className="input-card">
          <label htmlFor="topic">
            What do you want to study?
          </label>

          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: Explain JavaScript Promises and async/await..."
            rows="6"
          />

          <button onClick={handleGenerate}>
            Generate Flashcards
          </button>
        </section>

        <section className="empty-state">
          <div className="empty-icon">📚</div>
          <h2>Your flashcards will appear here</h2>
          <p>
            Enter a topic above and let AI create your study material.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;