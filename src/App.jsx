import { useState } from 'react';
import TopicSelector from './components/TopicSelector/TopicSelector';
import Quiz from './components/Quizz/Quiz';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBackToTopics = () => {
    setSelectedCategory(null);
  };

  return (
    <div>
      {/* если тема ещё не выбрана — показываем селектор */}
      {!selectedCategory ? (
        <TopicSelector onSelectCategory={setSelectedCategory} />
      ) : (
        // иначе — показываем ID выбранной темы
        <Quiz category={selectedCategory} />
      )}
    </div>
  );
}

export default App;
