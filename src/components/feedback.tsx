import React, { useState, useEffect } from 'react';

type FeedbackOverlayProps = {
    shouldDisplay: boolean; // Prop to control the display
    onToggle: (shouldDisplay: boolean) => void; // Updated prop to toggle the display
    feedbackReceiver?: string;
};

function FeedbackOverlay({ shouldDisplay, onToggle, feedbackReceiver }: FeedbackOverlayProps) {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    // Function to handle closing the overlay
    const handleClose = () => {
        onToggle(false); // Inform the parent component to hide the overlay
    };

    // Function to handle opening the overlay
    const handleOpen = () => {
        onToggle(true); // Inform the parent component to show the overlay
    };

    // Use an effect to call the onToggle prop when the component mounts and unmounts
    useEffect(() => {
        handleOpen(); // Initially open the overlay when mounted
        return () => handleClose(); // Close the overlay when unmounted
    }, [onToggle]);

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent form submission

        // Perform form validation
        if (validateForm()) {
            // Form is valid, show an alert (for now)
            alert('Feedback submitted successfully');
            setEmail('');
            setFeedback('');
            handleClose()
        } else {
            // Form is invalid, show an error message
            alert('Please fill in all fields');
        }
    };

    // Function to validate the form
    const validateForm = () => {
        return email.trim() !== '' && feedback.trim() !== '';
    };

    return (
        <div className="overlay" id="create-pi-overlay" style={{ display: shouldDisplay ? 'block' : 'none' }}>
            <div className="create-course-form-container">
                <button className="create-course-close-btn" onClick={handleClose}>
                    &times;
                </button>
                <h2>Provide Feedback</h2>
                <form className="new-course-form-container" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                placeholder={`Enter ${feedbackReceiver}'s email`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Feedback:</label>
                        <textarea
                            placeholder="Write your feedback here"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-info">
                        Submit Feedback
                    </button>
                </form>
            </div>

        </div>
    );
}

export default FeedbackOverlay;
