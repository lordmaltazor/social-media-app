import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase';
import {firestore} from '../firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Comment from './Comment';
import NewCommentForm from './NewCommentForm';
import Post from './Post';

function CommentsModal({post, postsRef, username, setCreatingComment}) {
    const [commentText, setCommentText] = useState('');
    
    const commentsRef = firestore.collection('posts').doc(post.id).collection('comments');   
    const commentsQuery = commentsRef.orderBy('createdAt', "desc"); 
    const [comments] = useCollectionData(commentsQuery, {idField: 'id'});

    const newCommentTextarea = useRef(null);

    useEffect(() => {
        newCommentTextarea.current.focus();
    }, [])

    const cancelComment = () => {
        setCreatingComment(false);
    }

    const postComment = () => {
        if (commentText !== '')
        {
            addCommentToDatabase();

            newCommentTextarea.current.value = '';
        }
    }

    const addCommentToDatabase = async() => {
        await commentsRef.add({
            text: commentText,
            sender: username,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
    
    return (
        <div className="backdrop">
            <div className="comments-modal">
                <Post post={post} postsRef={postsRef} username={username} isInteractable={false}/>
                
                <NewCommentForm setCommentText={setCommentText} cancelComment={cancelComment} postComment={postComment} newCommentTextarea={newCommentTextarea}/>
                
                <div className="comments">
                    {(comments && comments.length > 0) ? comments.map(comment => <Comment comment={comment} username={username}/>) : <p className="no-comments">There doesn't seem to be any comments here yet :/</p>}
                </div> 
            </div>
        </div>
    )
}

export default CommentsModal;
