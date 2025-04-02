// Get questions from The Trivia API
export const getQuestions = async (limit = 10, category) => {
  const url = `https://the-trivia-api.com/api/questions?limit=${limit}&categories=${category.toLowerCase()}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};
