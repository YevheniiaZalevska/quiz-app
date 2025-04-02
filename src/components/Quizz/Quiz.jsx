import { useEffect, useState } from 'react';
import styles from './Quiz.module.css';
import { getQuestions } from '../../services/quizApi';

export default function Quiz({ category, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions(5, category);
      setQuestions(data);
      setIsLoading(false);
    };
    fetchQuestions();
  }, [category]);

  const handleAnswerClick = (answer) => {
    const correct = answer === questions[currentIndex].correctAnswer;

    setSelectedAnswer(answer);
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);

    setQuestions((prev) => {
      const updated = [...prev];
      updated[currentIndex].userAnswer = answer;
      return updated;
    });
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setIsFinished(true);
    } else {
      setSelectedAnswer(null);
      setIsCorrect(null);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setQuestions([]);
    setIsLoading(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setIsFinished(false);
    getQuestions(5, category).then((data) => {
      setQuestions(data);
      setIsLoading(false);
    });
  };

  if (isLoading) return <p>Loading questions...</p>;
  if (!questions.length) return <p>No questions found.</p>;

  if (isFinished) {
    return (
      <div className={styles.wrapper}>
        <h2>Quiz finished 🎉</h2>
        <p>Your score: {score} / {questions.length}</p>

        <ul className={styles.reviewList}>
          {questions.map((q, index) => (
            <li key={index} className={styles.reviewItem}>
              <p dangerouslySetInnerHTML={{ __html: `${index + 1}. ${q.question}` }} />
              <p>
                <strong>Your answer:</strong>{' '}
                {q.userAnswer ?? 'No answer'}{' '}
                {q.userAnswer === q.correctAnswer ? '✅' : '❌'}
              </p>
              <p><strong>Correct answer:</strong> {q.correctAnswer}</p>
            </li>
          ))}
        </ul>

        <button onClick={handleRestart} className={styles.restartBtn}>
          Try again
        </button>

        <button onClick={onBack} className={styles.backBtn}>
          Choose new topic
        </button>
      </div>
    );
  }

  const question = questions[currentIndex];
  const allAnswers = [...question.incorrectAnswers, question.correctAnswer]
    .sort(() => Math.random() - 0.5);

  return (
    <div className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      <ul className={styles.answerList}>
        {allAnswers.map((answer) => (
          <li
            key={answer}
            onClick={() => handleAnswerClick(answer)}
            className={`${styles.answerItem} ${
              selectedAnswer === answer ? styles.selected : ''
            }`}
          >
            <span className={styles.circle}></span>
            {answer}
          </li>
        ))}
      </ul>

      {selectedAnswer && (
        <button onClick={handleNext} className={styles.nextBtn}>
          {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      )}
    </div>
  );
}
