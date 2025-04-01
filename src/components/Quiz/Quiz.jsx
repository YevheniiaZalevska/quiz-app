import { useEffect, useState } from 'react';
import styles from './Quiz.module.css';
import { getQuestions } from '../../services/quizApi';

export default function Quiz({ categoryId }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions(categoryId);
      setQuestions(data);
      setIsLoading(false);
    };
    fetchQuestions();
  }, [categoryId]);

  if (isLoading) return <p>Loading questions...</p>;

  return (
    <div className={styles.wrapper}>
      <h2>First Question:</h2>
      <p dangerouslySetInnerHTML={{ __html: questions[0].question }} />
    </div>
  );
}
