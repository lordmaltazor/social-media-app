import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { firestore } from '../firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function Post({ post, postsRef, username, isInteractable, setCreatingComment, setInspectedPost }) {
    const [isLiked, setIsLiked] = useState(false); // If the post has been liked by this user

    const [isShaking, setIsShaking] = useState(false);

    const [comments] = useCollectionData(firestore.collection('posts').doc(post.id).collection('comments'));

    useEffect(() => {
        setIsLiked(post.likedBy.includes(username));
    }, [])

    const like = () => {
        if (!post.likedBy.includes(username)) // Like the post
        {
            postsRef.doc(post.id).update({
                likedBy: firebase.firestore.FieldValue.arrayUnion(username)
            });

            setIsLiked(true);

            setIsShaking(true);
        }
        else // Unlike the post
        {
            postsRef.doc(post.id).update({
                likedBy: firebase.firestore.FieldValue.arrayRemove(username)
            });

            setIsLiked(false);

            setIsShaking(false);
        }
    }

    const openComments = () => {
        setCreatingComment(true);

        setInspectedPost(post);
    }

    return (
        <div className="post">
            <div className="post-container">
                <p className="post-sender" style={{ color: post.sender === username ? "rgb(255, 81, 0)" : "rgb(128, 128, 128)" }}>{post.sender}</p>
                <p className="post-text">{post.text}</p>
            </div>

            <div className="stats-container" style={{ display: isInteractable ? "flex" : "none" }}>
                <button className={`like-button ${isShaking ? "shake" : ""}`} onClick={like} style={{ color: isLiked ? "rgba(255, 0, 0, 1)" : 'rgba(128, 128, 128, 0.75)' }}><i className="fas fa-heart"></i></button>
                <p className="numer-of-likes">{post.likedBy.length}</p>

                <button className="comments-button" onClick={openComments}><i className="fas fa-comments"></i></button>
                <p className="numer-of-comments">{comments ? comments.length : 0}</p>
            </div>
        </div>
    )
}

export default Post;
