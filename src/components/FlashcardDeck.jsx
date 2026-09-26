import { useState } from "react";

function FlashcardDeck({ title, cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  return (
    <section className="flashcard-section">
      <h2>{title}</h2>

      <p className="progress">
        Card {currentIndex + 1} of {cards.length}
      </p>

      <div className="flashcard">
        <h3>{currentCard.question}</h3>

        {showAnswer && (
          <p className="answer">
            {currentCard.answer}
          </p>
        )}

        <button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
      </div>

      <div className="navigation">
        <button
          onClick={previousCard}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>

        <button
          onClick={nextCard}
          disabled={currentIndex === cards.length - 1}
        >
          Next →
        </button>
      </div>
    </section>
  );
}

export default FlashcardDeck;