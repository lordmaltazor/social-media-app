import React, { useEffect, useRef } from 'react';

function CreatePostModal({setPostText, cancelPost, post}) {
    const newPostTextarea = useRef(null);
    
    useEffect(() => {
        newPostTextarea.current.focus();
    }, [])

    const updatePostText = (e) => {
        setPostText(e.target.value);
    }
    
    return (
        <div className="backdrop">
            <div className="create-post-modal">
                <div className="create-post">
                    <textarea className="new-post-textarea" cols="30" rows="10" ref={newPostTextarea} onChange={updatePostText} placeholder="Say something..."></textarea>
                </div>
                
                <div className="buttons-container">
                    <button className="cancel-post-button" onClick={cancelPost}>Cancel</button>
                    <button className="post-button" onClick={post}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePostModal;
