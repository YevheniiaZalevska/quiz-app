import { useEffect, useState } from 'react';
import styles from './Quiz.module.css';
import { getQuestions } from '../../services/quizApi';

export default function Quiz({ category }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions(5, category); // загружаем 5 сразу
      setQuestions(data);
      setIsLoading(false);
    };
    fetchQuestions();
  }, [category]);

  if (isLoading) return <p>Loading questions...</p>;
  if (!questions.length) return <p>No questions found.</p>;

  const question = questions[currentIndex];
  const allAnswers = [...question.incorrectAnswers, question.correctAnswer]
    .sort(() => Math.random() - 0.5);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === question.correctAnswer);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const isLastQuestion = currentIndex === questions.length - 1;

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
        <>
          <p className={styles.result}>
            {isCorrect ? 'Correct ✅' : 'Wrong ❌'}
          </p>
          {!isLastQuestion ? (
            <button onClick={handleNext} className={styles.nextBtn}>Next</button>
          ) : (
            <p className={styles.result}>Quiz finished 🎉</p>
          )}
        </>
      )}
    </div>
  );
}
