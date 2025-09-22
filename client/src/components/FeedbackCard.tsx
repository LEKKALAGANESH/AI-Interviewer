import React from "react";

interface FeedbackCardProps {
    analysis: any;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ analysis }) => {
    const { scores, feedback, recommendation } = analysis;

    return (
        <div className="feedback-card p-4 border rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Interview Feedback</h2>

            {Object.keys(scores).map((category) => (
                <div key={category} className="mb-3">
                    <h3 className="font-semibold">{category} - Score: {scores[category]}</h3>
                    <p>{feedback[category]}</p>
                </div>
            ))}

            <h3 className="text-xl font-bold mt-4">Overall Recommendation: {recommendation}</h3>
        </div>
    );
};

export default FeedbackCard;
