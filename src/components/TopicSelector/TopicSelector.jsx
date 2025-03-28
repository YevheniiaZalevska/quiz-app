import { useEffect, useState } from 'react';
import styles from './TopicSelector.module.css';
import { getCategories } from '../../services/quizApi';


export default function TopicSelector({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Select a topic</h2>

      <select
        onChange={(e) => onSelectCategory(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select a category</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}