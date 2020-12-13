import React from 'react';

function Comment({comment, username}) {
    return (
        <div className="comment">
            <div className="comment-container">
                <p className="comment-sender" style={{ color: comment.sender === username ? "rgb(255, 81, 0)" : "rgb(128, 128, 128)"}}>{comment.sender}</p>
                <p className="comment-text">{comment.text}</p>
            </div>
        </div>
    )
}

export default Comment;
