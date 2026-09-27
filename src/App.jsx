import FlashcardDeck from "./components/FlashcardDeck";
import { parseAndValidateResult } from "./lib/validateResult";
import { useRef, useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestId = useRef(0);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      setResult(null);
      return;
}

    const currentRequestId = ++requestId.current;

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
    controller.abort();
}, 90000);

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("https://flam-study-assistant-wg5k.onrender.com/api/generate", {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
        }),
      });

      const data = await response.json();

      // Ignore response if a newer request has started
      if (currentRequestId !== requestId.current) {
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to generate flashcards"
        );
      }

      const validatedResult = parseAndValidateResult(data.result);

      if (!validatedResult) {
        throw new Error("AI returned an invalid response.");
      }

      console.log("Validated result:", validatedResult);
      setResult(validatedResult);
    } catch (error) {
      // Ignore errors from older requests
      if (currentRequestId !== requestId.current) {
        return;
      }

      if (error.name === "AbortError") {
        setError("The request took too long. Please try again.");
      } else {
        console.error("Generation error:", error);
        setError(error.message);
      }
    } finally {
      clearTimeout(timeoutId);

      // Only the latest request controls loading state
      if (currentRequestId === requestId.current) {
        setLoading(false);
      }
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

          <button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Flashcards"}
          </button>
        </section>

        {loading && (
          <section className="status">
            <p>Generating your flashcards...</p>
          </section>
        )}

        {error && (
          <section className="error">
            <p>{error}</p>
          </section>
        )}

        {!loading && !error && !result && (
          <section className="empty-state">
            <div className="empty-icon">📚</div>
            <h2>Your flashcards will appear here</h2>
            <p>
              Enter a topic above and let AI create your study material.
            </p>
          </section>
        )}

        {result && (
          <FlashcardDeck
            title={result.title}
            cards={result.cards}
          />
        )}
      </main>
    </div>
  );
}

export default App;