import React from 'react';

function NewCommentForm({ setCommentText, cancelComment, postComment, newCommentTextarea }) {
    const updateCommentText = (e) => {
        setCommentText(e.target.value);
    }

    return (
        <div className="new-comment-form">
            <textarea className="new-comment-textarea" cols="30" rows="10" onChange={updateCommentText} ref={newCommentTextarea} placeholder="Say something..."></textarea>

            <button className="post-comment-button" onClick={postComment}>Comment</button>
        </div>
    )
}

export default NewCommentForm;
