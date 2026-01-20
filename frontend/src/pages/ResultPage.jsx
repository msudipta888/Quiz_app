import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    const resultId = location.state?.resultId;

    useEffect(() => {
        const fetchResult = async () => {
            if (!resultId) return;
            try {
                const response = await axios.get(`http://localhost:5000/api/results/${resultId}`);
                setResult(response.data);
            } catch (error) {
                console.error('Error fetching result:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResult();
    }, [resultId]);

    if (!resultId) return <div className="glass-card text-center">No result found. Please take a quiz first.</div>;
    if (loading) return <div>Loading result...</div>;
    if (!result) return <div>Result not found</div>;

    const percentage = Math.round((result.score / result.totalQuestions) * 100);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div className="glass-card">
                <h1 style={{ marginBottom: '0.5rem' }}>Quiz Completed!</h1>
                <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>Here is how you performed</p>

                <div style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: `conic-gradient(var(--primary-color) ${percentage}%, rgba(255,255,255,0.1) 0)`,
                    margin: '0 auto 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '180px',
                        height: '180px',
                        background: 'var(--background-dark)',
                        borderRadius: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{percentage}%</span>
                        <span style={{ color: '#94a3b8' }}>Score</span>
                    </div>
                </div>

                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    {result.score} <span style={{ fontSize: '1rem', color: '#94a3b8' }}>/ {result.totalQuestions}</span>
                </h2>

                <p style={{ marginBottom: '2rem' }}>
                    {percentage >= 80 ? 'Excellent work! You nailed it.' :
                        percentage >= 50 ? 'Good job! Keep practicing.' :
                            'Don\'t give up! Try again.'}
                </p>

                <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Back to Home</Link>
            </div>
        </div>
    );
};

export default ResultPage;
