import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/feedback', {
        message: feedback
      });
      if (response.data.success) {
        setSubmitted(true);
        console.log('Feedback submitted successfully.');
      } else {
        setError('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      setError('Error submitting feedback. Please try again later.');
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Feedback Form</h2>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmitFeedback}>
          <div className="form-group">
            <label htmlFor="feedbackMessage">Feedback Message</label>
            <textarea
              className="form-control"
              id="feedbackMessage"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Feedback
          </button>
        </form>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default FeedbackForm;
