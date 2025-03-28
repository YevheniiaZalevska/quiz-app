import { useState } from 'react';
import TopicSelector from './components/TopicSelector/TopicSelector';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      {/* если тема ещё не выбрана — показываем селектор */}
      {!selectedCategory ? (
        <TopicSelector onSelectCategory={setSelectedCategory} />
      ) : (
        // иначе — показываем ID выбранной темы
        <p>You selected category ID: {selectedCategory}</p>
      )}
    </div>
  );
}

export default App;
