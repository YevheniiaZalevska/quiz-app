import styles from './TopicSelector.module.css';

const categories = [
  'music',
  'history',
  'science',
  'geography',
  'film_and_tv',
  'sport_and_leisure'
];


export default function TopicSelector({ onSelectCategory }) {
  return (
    <div className={styles.wrapper}>
      <h2>Select a topic</h2>

      <select onChange={(e) => onSelectCategory(e.target.value)} defaultValue="">
        <option value="" disabled>Select a category</option>
        {categories.map((name) => (
          <option key={name} value={name}>
            {name.replace(/_/g, ' ')}
          </option>
        ))}
      </select>
    </div>
  );
}
