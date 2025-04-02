import { useEffect, useState } from 'react';
import styles from './Quiz.module.css';
import { getQuestions } from '../../services/quizApi';

export default function Quiz({ category }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions(10, category);
      setQuestions(data);
      setIsLoading(false);
    };
    fetchQuestions();
  }, [category]);

  if (isLoading) return <p>Loading questions...</p>;
  if (!questions || questions.length === 0) return <p>No questions found.</p>;

  return (
    <div className={styles.wrapper}>
      <h2>First Question:</h2>
      <p>{questions[0].question}</p>
    </div>
  );
}
