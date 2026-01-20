import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) return <div className="text-center">Loading quizzes...</div>;

    return (
        <div>
            <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '3rem' }}>
                Ready to test your <span style={{ color: '#818cf8' }}>knowledge?</span>
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {quizzes.length === 0 ? (
                    <div className="glass-card" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
                        <h3>No quizzes available yet. Be the first to create one!</h3>
                        <Link to="/create" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>Create a Quiz</Link>
                    </div>
                ) : (
                    quizzes.map((quiz) => (
                        <div key={quiz._id} className="glass-card">
                            <h2>{quiz.title}</h2>
                            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>{quiz.description || 'No description provided.'}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{quiz.questions.length} Questions</span>
                                <Link to={`/quiz/${quiz._id}`} className="btn-primary" style={{ textDecoration: 'none' }}>Start Quiz</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
