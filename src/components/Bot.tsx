import React from 'react';

interface BotProps {
    className?: string; // Allow className as an optional prop
}

const Bot: React.FC<BotProps> = ({ className }) => {
    return <div className={className}>I am a Bot component!</div>; // Apply className here
};

export default Bot; 