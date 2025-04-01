import { useState } from 'react';
import TopicSelector from './components/TopicSelector/TopicSelector';
import Quiz from './components/Quiz/Quiz';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      {/* если тема ещё не выбрана — показываем селектор */}
      {!selectedCategory ? (
        <TopicSelector onSelectCategory={setSelectedCategory} />
      ) : (
        // иначе — показываем ID выбранной темы
        <Quiz categoryId={selectedCategory} />
      )}
    </div>
  );
}

export default App;
