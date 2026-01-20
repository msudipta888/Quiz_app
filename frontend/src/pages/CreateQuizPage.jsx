import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuizPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://quiz-app-aegy.onrender.com/api/quizzes', {
                title,
                description,
                questions
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating quiz:', error);
            alert('Failed to create quiz');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create a New Quiz</h1>
            <form onSubmit={handleSubmit}>
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Quiz Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="e.g., JavaScript Basics"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            placeholder="Briefly describe what this quiz is about..."
                        />
                    </div>
                </div>

                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="glass-card" style={{ marginBottom: '1.5rem', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3>Question {qIndex + 1}</h3>
                            {questions.length > 1 && (
                                <button type="button" onClick={() => removeQuestion(qIndex)} style={{ background: '#ef4444', padding: '8px 16px', fontSize: '0.8rem' }}>Remove</button>
                            )}
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="text"
                                value={q.questionText}
                                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                                required
                                placeholder="Type your question here..."
                                style={{ fontSize: '1.1rem' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            {q.options.map((option, oIndex) => (
                                <input
                                    key={oIndex}
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    required
                                    placeholder={`Option ${oIndex + 1}`}
                                />
                            ))}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>Correct Answer (Copy-Paste mostly for now, or select)</label>
                            <select
                                value={q.correctAnswer}
                                onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                                required
                            >
                                <option value="">Select Correct Answer</option>
                                {q.options.map((opt, i) => (
                                    opt && <option key={i} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                    <button type="button" onClick={addQuestion} style={{ background: 'rgba(255, 255, 255, 0.1)' }}>+ Add Question</button>
                    <button type="submit" className="btn-primary">Publish Quiz</button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuizPage;
