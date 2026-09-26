export function parseAndValidateResult(rawResult) {
  try {
    const data = JSON.parse(rawResult);

    if (!data.title || typeof data.title !== "string") {
      return null;
    }

    if (!Array.isArray(data.cards)) {
      return null;
    }

    if (data.cards.length === 0) {
      return null;
    }

    for (const card of data.cards) {
      if (
        typeof card.id !== "number" ||
        typeof card.question !== "string" ||
        typeof card.answer !== "string"
      ) {
        return null;
      }
    }

    return data;
  } catch (error) {
    return null;
  }
}