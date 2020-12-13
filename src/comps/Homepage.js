import React, { useState } from 'react';
import firebase from 'firebase';
import {firestore} from '../firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import CreatePostModal from './CreatePostModal';
import Feed from './Feed';

function Homepage({username, setHasLoggedIn}) {
    const [creatingPost, setCreatingPost] = useState(false);
    const [creatingComment, setCreatingComment] = useState(false);

    const [postText, setPostText] = useState('');

    const postsRef = firestore.collection('posts');   
    const query = postsRef.orderBy('createdAt', "desc"); 
    const [posts] = useCollectionData(query, {idField: 'id'});

    const signOut = () => {
        setHasLoggedIn(false);
    }

    const createPost = () => {
        setCreatingPost(true);
    }

    const cancelPost = () => {
        setCreatingPost(false);
    }

    const post = () => {
        if (postText !== '')
        {
            setCreatingPost(false);
            
            addPostToDatabase();
        }
    }

    const addPostToDatabase = async() => {
        await postsRef.add({
            text: postText,
            likedBy: [],
            sender: username,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    return (
        <div className="homepage">
            <nav>
                <button className="create-post-button" onClick={createPost}>Create Post</button>

                <h1 className="title">Social Media App</h1>

                <div className="profile-info">
                    <p className="current-username">{username}</p>
                    <button className="sign-out-button" onClick={signOut}>Sign Out</button>
                </div>
            </nav>

            <Feed posts={posts} postsRef={postsRef} username={username} creatingComment={creatingComment} setCreatingComment={setCreatingComment}/>

            {creatingPost && <CreatePostModal setPostText={setPostText} cancelPost={cancelPost} post={post}/>}
        </div>
    )
}

export default Homepage;
