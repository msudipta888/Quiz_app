import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TakeQuizPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {

            handleSubmit();
        }
    }, [timeLeft]);

    const handleOptionSelect = (option) => {
        setAnswers({ ...answers, [currentQuestionIndex]: option });
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        let score = 0;
        quiz.questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                score++;
            }
        });

        try {
            const resultData = {
                quizId: id,
                userName: 'Student User',
                score: score,
                totalQuestions: quiz.questions.length
            };

            const response = await axios.post('http://localhost:5000/api/results', resultData);
            navigate('/result', { state: { resultId: response.data._id } });
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (loading) return <div>Loading...</div>;
    if (!quiz) return <div>Quiz not found</div>;

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>{quiz.title}</h2>
                <div style={{ background: '#334155', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', color: timeLeft < 60 ? '#ef4444' : '#f8fafc' }}>
                    Time Left: {formatTime(timeLeft)}
                </div>
            </div>

            <div className="glass-card">
                <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                        Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </span>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 500 }}>{currentQuestion.questionText}</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            style={{
                                textAlign: 'left',
                                background: answers[currentQuestionIndex] === option ? 'rgba(99, 102, 241, 0.4)' : 'rgba(15, 23, 42, 0.6)',
                                border: answers[currentQuestionIndex] === option ? '1px solid #6366f1' : '1px solid transparent',
                                padding: '1rem',
                                fontSize: '1rem'
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        style={{ background: 'transparent', color: currentQuestionIndex === 0 ? '#475569' : 'white' }}
                    >
                        Previous
                    </button>

                    {currentQuestionIndex === quiz.questions.length - 1 ? (
                        <button onClick={handleSubmit} className="btn-primary">Submit Quiz</button>
                    ) : (
                        <button onClick={handleNext} className="btn-primary">Next Question</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TakeQuizPage;
