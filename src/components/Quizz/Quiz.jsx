import { useEffect, useState } from 'react';
import styles from './Quiz.module.css';
import { getQuestions } from '../../services/quizApi';

export default function Quiz({ category }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions(1, category);
      setQuestions(data);
      setIsLoading(false);
    };
    fetchQuestions();
  }, [category]);

  if (isLoading) return <p>Loading questions...</p>;
  if (!questions.length) return <p>No questions found.</p>;

  const question = questions[0];
  const allAnswers = [...question.incorrectAnswers, question.correctAnswer]
    .sort(() => Math.random() - 0.5);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === question.correctAnswer);
  };

  return (
    <div className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      <ul className={styles.answerList}>
        {allAnswers.map((answer) => (
          <li
            key={answer}
            onClick={() => handleAnswerClick(answer)}
            className={`${styles.answerItem} ${
              selectedAnswer === answer
                ? answer === question.correctAnswer
                  ? styles.correct
                  : styles.incorrect
                : ''
            }`}
          >
            {answer}
          </li>
        ))}
      </ul>

      {selectedAnswer && (
        <p className={styles.result}>
          {isCorrect ? 'Correct ✅' : 'Wrong ❌'}
        </p>
      )}
    </div>
  );
}
