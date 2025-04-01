export const getCategories = async () => {
  const res = await fetch('https://opentdb.com/api_category.php');

  // Преобразуем полученный ответ в обычный JS-объект
  const data = await res.json();

  // Возвращаем массив категорий из полученных данных
  return data.trivia_categories;
};


// Загружает вопросы по выбранной категории (и сложности)
export const getQuestions = async (categoryId, amount = 10, difficulty = 'medium') => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
  const res = await fetch(url); // Отправляем запрос
  const data = await res.json(); // Преобразуем ответ в объект
  return data.results; // Возвращаем только массив вопросов

};
