export const getCategories = async () => {
  const res = await fetch('https://opentdb.com/api_category.php');

  // Преобразуем полученный ответ в обычный JS-объект
  const data = await res.json();

  // Возвращаем массив категорий из полученных данных
  return data.trivia_categories;
};
